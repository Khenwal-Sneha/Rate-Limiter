package com.demo.ratelimiter.metrics;

public class RequestEvent {

    private long timestamp;

    private boolean allowed;

    public RequestEvent(
            long timestamp,
            boolean allowed
    ) {

        this.timestamp = timestamp;

        this.allowed = allowed;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public boolean isAllowed() {
        return allowed;
    }
}