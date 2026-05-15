package com.demo.ratelimiter.service;

import org.springframework.stereotype.Service;

import com.demo.ratelimiter.strategy.RateLimitingStrategy;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class FixedWindowStrategy
        implements RateLimitingStrategy {

    private final ConcurrentHashMap<
            String,
            Integer
            > counter = new ConcurrentHashMap<>();

    private final ConcurrentHashMap<
            String,
            Long
            > windowStart = new ConcurrentHashMap<>();

    private static final int LIMIT = 5;

    private static final long WINDOW_SIZE =
            60_000;

    public boolean allowRequest(
            String userId
    ) {

        long now =
                System.currentTimeMillis();

        windowStart.putIfAbsent(
                userId,
                now
        );

        counter.putIfAbsent(
                userId,
                0
        );

        long start =
                windowStart.get(userId);

        if (now - start > WINDOW_SIZE) {

            windowStart.put(
                    userId,
                    now
            );

            counter.put(
                    userId,
                    0
            );
        }

        int current =
                counter.get(userId);

        if (current < LIMIT) {

            counter.put(
                    userId,
                    current + 1
            );

            return true;
        }

        return false;
    }

    @Override
    public int remainingRequests(
            String userId
    ) {

        return LIMIT -
                counter.getOrDefault(
                        userId,
                        0
                );
    }
}