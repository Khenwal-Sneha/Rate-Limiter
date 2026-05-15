package com.demo.ratelimiter.metrics;

import java.util.concurrent.ConcurrentHashMap;

public class UserMetrics {

    private long totalAllowedRequests;

    private long totalBlockedRequests;

    private final ConcurrentHashMap<
            String,
            StrategyMetrics
            > strategyMetrics =
            new ConcurrentHashMap<>();

    public synchronized void
    incrementAllowed(
            String algorithm
    ) {

        totalAllowedRequests++;

        strategyMetrics.putIfAbsent(
                algorithm,
                new StrategyMetrics()
        );

        strategyMetrics
                .get(algorithm)
                .incrementAllowed();
    }

    public synchronized void
    incrementBlocked(
            String algorithm
    ) {

        totalBlockedRequests++;

        strategyMetrics.putIfAbsent(
                algorithm,
                new StrategyMetrics()
        );

        strategyMetrics
                .get(algorithm)
                .incrementBlocked();
    }

    public long getTotalAllowedRequests() {

        return totalAllowedRequests;
    }

    public long getTotalBlockedRequests() {

        return totalBlockedRequests;
    }

    public ConcurrentHashMap<
            String,
            StrategyMetrics
            > getStrategyMetrics() {

        return strategyMetrics;
    }
}