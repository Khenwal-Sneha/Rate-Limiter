````md
# Rate Limiter — Complete Understanding

A **Rate Limiter** is a middleware component placed before the actual API/business logic.  
Its job is to decide whether an incoming request should be accepted or rejected.

In simple terms:

- If request count is within allowed limit → allow request
- If limit is exceeded → reject request with `429 Too Many Requests`

It is commonly used to:

- prevent API abuse
- stop brute force attacks
- avoid server overload
- ensure fair usage among users

---

# Where Rate Limiter Sits

```text
Client Request
      |
      v
+----------------+
|  Rate Limiter  |
+----------------+
      |
Allowed? ---- No ---> 429 Too Many Requests
      |
     Yes
      |
      v
   API Server
      |
 Business Logic
````

The rate limiter acts like a gatekeeper before requests reach the backend application.

---

# Basic In-Memory Rate Limiter

The simplest implementation can be built using:

* `HashMap`
* request counter
* time window

The key can be:
* User ID
* IP Address
* API Key

Example:

```text
"user123" -> 45
```

This means the user has already made 45 requests in the current time window.

---

# Fixed Window Example

Suppose the rule is:

```text
Allow maximum 5 requests per minute
```

Current window:

```text
12:00:00 → 12:00:59
```

Requests:

```text
12:00:10 -> Request 1
12:00:20 -> Request 2
12:00:30 -> Request 3
12:00:40 -> Request 4
12:00:50 -> Request 5
```

Next request:

```text
12:00:55 -> Rejected
```

because limit exceeded.

At:

```text
12:01:00
```

the counter resets again.

---

# Problems With Basic In-Memory Rate Limiter

Although this approach is easy to build, it has many real-world problems.

---

# 1. Data Loss on Server Restart

Since all data is stored in RAM inside a `HashMap`, restarting the server clears everything.

Example:

Suppose a user has already consumed:

```text
99 / 100 requests
```

Now server crashes or restarts.

After restart:

```text
counter becomes 0
```

The user again receives another full quota of requests.

This breaks the rate limiting guarantee because the server forgets previous state.

---

# 2. Not Distributed (Multi-Server Problem)

Modern applications usually run multiple backend servers behind a load balancer.

Example:

```text
              Load Balancer
             /      |      \
           S1       S2      S3
```

Each server maintains its own local hashmap.

Suppose limit is:

```text
100 requests/minute
```

Now the same user sends:

```text
100 requests -> Server 1
100 requests -> Server 2
100 requests -> Server 3
```

Total accepted:

```text
300 requests
```

because every server tracks requests independently.

So rate limiting completely breaks in distributed systems.

---

# 3. HashMap Is Not Thread Safe

Backend servers handle multiple requests simultaneously using multiple threads.

Normal `HashMap` is not thread-safe.

This creates race conditions and inconsistent counts.

Example:

Current state:

```text
count = 4
limit = 5
```

Two requests arrive at exactly the same time.

Thread 1 reads:

```text
count = 4
```

Thread 2 also reads:

```text
count = 4
```

Both threads think request is valid.

Both increment count to:

```text
count = 5
```

Now both requests are accepted.

But in reality:

```text
6 requests were allowed
```

even though limit was only 5.

---

# 4. Concurrency Issues Even With ConcurrentHashMap

Even if we replace `HashMap` with:

```java
ConcurrentHashMap
```

the problem is not fully solved.

Why?

Because operations like:

```text
read -> validate -> increment
```

are still separate operations.

Example:

Thread 1:

```text
reads count = 4
```

Thread 2:

```text
reads count = 4
```

Both validate successfully.

Both increment count.

Again, extra requests get accepted.

To solve this, atomic operations or distributed locking mechanisms are needed.

---

# 5. Fixed Window Burst Problem

Fixed window has a major design flaw called the **burst problem**.

Example:

Limit:

```text
100 requests/minute
```

Window 1:

```text
12:00:00 → 12:00:59
```

Window 2:

```text
12:01:00 → 12:01:59
```

User sends:

```text
100 requests at 12:00:59
```

and immediately:

```text
100 requests at 12:01:00
```

Total:

```text
200 requests in 2 seconds
```

even though the intended limit was:

```text
100 requests/minute
```

This creates sudden traffic spikes near window boundaries.

---

# Rate Limiting Algorithms

Different algorithms solve different problems.

---

# 1. Fixed Window Counter

This is the simplest algorithm.

A single counter is maintained for each time window.

Example:

```text
100 requests/minute
```

Counter resets every minute.

## Advantages

* simple implementation
* fast
* memory efficient

## Disadvantages

* burst problem
* inaccurate near boundaries

---

# 2. Sliding Window Log

Instead of storing just a counter, store timestamp of every request.

When a new request arrives:

* remove old timestamps
* count only recent timestamps within window

Example:

Current time:

```text
12:01:00
```

Store only requests from:

```text
12:00:00 → 12:01:00
```

If 100 timestamps already exist:

```text
reject request
```

## Advantages

* highly accurate
* no burst issue

## Disadvantages

* memory heavy
* cleanup expensive
* storing every request is costly

---

# 3. Sliding Window Counter

Optimized version of sliding window.

Instead of storing all timestamps:

* keep previous window count
* keep current window count
* calculate weighted estimate

This reduces memory usage significantly.

## Advantages

* smoother than fixed window
* memory efficient
* better traffic handling

## Disadvantages

* slightly more complex
* still approximate, not perfectly accurate

---

# 4. Token Bucket

One of the most commonly used algorithms in production systems.

## Idea

A bucket contains tokens.

Each request consumes one token.

Tokens refill gradually over time.

If bucket becomes empty:

```text
request rejected
```

Example:

Bucket capacity:

```text
10 tokens
```

Refill rate:

```text
1 token/second
```

If user sends:

```text
10 requests instantly
```

all are accepted.

Next request:

```text
rejected
```

After one second:

```text
1 token added
```

one request becomes allowed again.

## Advantages

* supports controlled bursts
* smooth traffic handling
* widely used in industry
* flexible

## Disadvantages

* refill logic required
* implementation slightly complex

---

# 5. Leaky Bucket

This algorithm works like water flowing through a bucket.

Incoming requests enter queue rapidly.

Requests are processed at a fixed constant rate.

Example:

Incoming:

```text
100 requests instantly
```

Outgoing processing:

```text
10 requests/second
```

Traffic becomes smooth and controlled.

## Advantages

* smooth output rate
* prevents sudden spikes
* stable traffic flow

## Disadvantages

* queued requests may wait
* queue overflow possible
* added latency

---

# Why Redis Is Used in Real Systems

Instead of storing counters inside local memory, production systems usually use Redis.

Redis provides:

* distributed shared storage
* very fast in-memory operations
* atomic increment operations
* expiry support (TTL)
* persistence support
* scalability

Example:

```text
INCR user123
EXPIRE user123 60
```

This increments user counter and automatically removes it after 60 seconds.

---

# Typical Production Architecture

```text
Client
   |
Load Balancer
   |
+----------------------+
|   API Servers        |
|   (Spring Boot)      |
+----------------------+
   |
   v
+----------------------+
|        Redis         |
+----------------------+
```

All backend servers use the same Redis instance for rate limiting.

This ensures:

* consistent limits
* distributed coordination
* thread safety
* scalability

---

# Final Understanding

A simple in-memory rate limiter is useful for learning concepts, but it fails in real distributed systems because of:

* server restart data loss
* multi-server inconsistency
* concurrency issues
* race conditions
* fixed window burst problem

Different algorithms improve different aspects:

* Fixed Window → simple but inaccurate
* Sliding Window Log → accurate but memory expensive
* Sliding Window Counter → balanced approach
* Token Bucket → most practical and widely used
* Leaky Bucket → smooth request flow

Modern production systems usually combine:

* Redis
* atomic operations
* distributed architecture
* token bucket/sliding window approaches

to build scalable and reliable API rate limiters.

```
```
