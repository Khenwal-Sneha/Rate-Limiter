package com.demo.ratelimiter.metrics;

public class StrategyMetrics {

    private long allowedRequests;

    private long blockedRequests;

    public synchronized void
    incrementAllowed() {

        allowedRequests++;
    }

    public synchronized void
    incrementBlocked() {

        blockedRequests++;
    }

    public long getAllowedRequests() {
        return allowedRequests;
    }

    public long getBlockedRequests() {
        return blockedRequests;
    }
}