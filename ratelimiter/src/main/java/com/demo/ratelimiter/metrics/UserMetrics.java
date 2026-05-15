package com.demo.ratelimiter.metrics;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class UserMetrics {

    private long totalAllowedRequests;

    private long totalBlockedRequests;

    private final List<RequestEvent>
            requestEvents =
            new ArrayList<>();

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

        addRequestEvent(true);

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

        addRequestEvent(false);

        strategyMetrics.putIfAbsent(
                algorithm,
                new StrategyMetrics()
        );

        strategyMetrics
                .get(algorithm)
                .incrementBlocked();
    }

    public synchronized void
    addRequestEvent(
            boolean allowed
    ) {

        requestEvents.add(

                new RequestEvent(
                        System.currentTimeMillis(),
                        allowed
                )
        );
    }

    public long
    getTotalAllowedRequests() {

        return totalAllowedRequests;
    }

    public long
    getTotalBlockedRequests() {

        return totalBlockedRequests;
    }

    public List<RequestEvent>
    getRequestEvents() {

        return requestEvents;
    }

    public ConcurrentHashMap<
            String,
            StrategyMetrics
            > getStrategyMetrics() {

        return strategyMetrics;
    }
}