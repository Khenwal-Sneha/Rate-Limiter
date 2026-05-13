package com.demo.ratelimiter.service;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RateLimiterService {

    @org.springframework.beans.factory.annotation.Value(
        "${rate.limit.capacity}"
    )
    private double capacity;

    @org.springframework.beans.factory.annotation.Value(
        "${rate.limit.refill-rate}"
    )
    private double refillRate;

    private final StringRedisTemplate redisTemplate;

    public RateLimiterService(
            StringRedisTemplate redisTemplate
    ) {
        this.redisTemplate = redisTemplate;
    }

    public boolean allowRequest(String userId) {
        System.out.println("Processing request for user: "+ userId);

        String key = "token_bucket:" + userId;

        HashOperations<String, Object, Object> hashOps =
                redisTemplate.opsForHash();

        long currentTime =
                System.currentTimeMillis();

        double tokens;
        long lastRefillTime;

        Object tokenObj =
                hashOps.get(key, "tokens");

        Object refillObj =
                hashOps.get(key, "lastRefillTime");

        if (tokenObj == null || refillObj == null) {

            tokens = capacity;
            lastRefillTime = currentTime;

        } else {

            tokens =
                    Double.parseDouble(
                            tokenObj.toString()
                    );

            lastRefillTime =
                    Long.parseLong(
                            refillObj.toString()
                    );
        }

        double elapsedSeconds =
                (currentTime - lastRefillTime)
                        / 1000.0;

        double refillTokens =
                elapsedSeconds * refillRate;

        tokens = Math.min(
                capacity,
                tokens + refillTokens
        );

        lastRefillTime = currentTime;

        if (tokens < 1) {

            hashOps.put(
                    key,
                    "tokens",
                    String.valueOf(tokens)
            );

            hashOps.put(
                    key,
                    "lastRefillTime",
                    String.valueOf(lastRefillTime)
            );
            System.out.println("Rate limit exceeded for user: "+ userId);
            return false;
        }

        tokens -= 1;

        hashOps.put(
                key,
                "tokens",
                String.valueOf(tokens)
        );

        hashOps.put(
                key,
                "lastRefillTime",
                String.valueOf(lastRefillTime)
        );

        redisTemplate.expire(
                key,
                java.time.Duration.ofMinutes(10)
        );

        System.out.println("Request Allowed: "+ userId);
        return true;
    }

    public int remainingReq(
            String userId
    ) {

        String key = "token_bucket:" + userId;

        Object tokenObj =
                redisTemplate.opsForHash()
                        .get(key, "tokens");

        if (tokenObj == null) {
            return (int) capacity;
        }

        return (int) Math.floor(
                Double.parseDouble(
                        tokenObj.toString()
                )
        );
    }
}