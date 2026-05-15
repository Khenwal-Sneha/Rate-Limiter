package com.demo.ratelimiter.strategy;

public interface RateLimitingStrategy {

    boolean allowRequest(String userId);

    int remainingRequests(String userId);
}