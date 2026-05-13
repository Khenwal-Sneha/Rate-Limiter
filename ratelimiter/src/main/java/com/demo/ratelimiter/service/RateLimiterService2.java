package com.demo.ratelimiter.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RateLimiterService2 {

    private static final int MAX_REQUESTS = 5;
    private static final long WINDOW_SIZE = 1;

    private final StringRedisTemplate redisTemplate;

    public RateLimiterService2(
            StringRedisTemplate redisTemplate
    ) {
        this.redisTemplate = redisTemplate;
    }

    public boolean allowRequest(String userId) {

        String key = "rate_limiter:" + userId;

        Long currentCount =
                redisTemplate.opsForValue().increment(key);

        if (currentCount == 1) {

            redisTemplate.expire(
                    key,
                    WINDOW_SIZE,
                    TimeUnit.MINUTES
            );
        }

        return currentCount <= MAX_REQUESTS;
    }

    public int remainingReq(String userId) {

        String key = "rate_limiter:" + userId;

        String value =
                redisTemplate.opsForValue().get(key);

        int currentCount =
                value == null ? 0 : Integer.parseInt(value);

        return Math.max(
                0,
                MAX_REQUESTS - currentCount
        );
    }
}