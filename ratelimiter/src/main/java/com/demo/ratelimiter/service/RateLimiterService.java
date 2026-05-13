package com.demo.ratelimiter.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RateLimiterService {

    private static final int MAX_REQUESTS = 5;

    private static final long WINDOW_SIZE_MS =
            60 * 1000;

    private final StringRedisTemplate redisTemplate;

    public RateLimiterService(
            StringRedisTemplate redisTemplate
    ) {
        this.redisTemplate = redisTemplate;
    }

    public boolean allowRequest(String userId) {

        String key = "rate_limiter:" + userId;

        long currentTime =
                System.currentTimeMillis();

        long windowStart =
                currentTime - WINDOW_SIZE_MS;

        ZSetOperations<String, String> zSetOps =
                redisTemplate.opsForZSet();

        zSetOps.removeRangeByScore(
                key,
                0,
                windowStart
        );

        Long requestCount =
                zSetOps.zCard(key);

        if (requestCount != null &&
                requestCount >= MAX_REQUESTS) {

            return false;
        }

        zSetOps.add(
                key,
                String.valueOf(currentTime),
                currentTime
        );

        redisTemplate.expire(
                key,
                java.time.Duration.ofMinutes(1)
        );

        return true;
    }

    public int remainingReq(String userId) {

        String key = "rate_limiter:" + userId;

        Long requestCount =
                redisTemplate.opsForZSet()
                        .zCard(key);

        int currentCount =
                requestCount == null
                        ? 0
                        : requestCount.intValue();

        return Math.max(
                0,
                MAX_REQUESTS - currentCount
        );
    }
}