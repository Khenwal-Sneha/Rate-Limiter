package com.demo.ratelimiter.metrics;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserMetricsService {

    private final ConcurrentHashMap<
            String,
            UserMetrics
            > metricsStore =
            new ConcurrentHashMap<>();

    public UserMetrics getMetrics(
            String userId
    ) {

        metricsStore.putIfAbsent(
                userId,
                new UserMetrics()
        );

        return metricsStore.get(userId);
    }

    public void recordAllowedRequest(
            String userId,
            String algorithm
    ) {

        UserMetrics metrics =
                getMetrics(userId);

        metrics.incrementAllowed(
                algorithm
        );
    }

    public void recordBlockedRequest(
            String userId,
            String algorithm
    ) {

        UserMetrics metrics =
                getMetrics(userId);

        metrics.incrementBlocked(
                algorithm
        );
    }
}