package com.demo.ratelimiter.controller;

import com.demo.ratelimiter.metrics.UserMetricsService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserMetricsController {

    private final UserMetricsService
            userMetricsService;

    public UserMetricsController(
            UserMetricsService userMetricsService
    ) {

        this.userMetricsService =
                userMetricsService;
    }

    @GetMapping("/metrics")
    public Object getMetrics(
            @RequestParam String userId
    ) {

        return userMetricsService
                .getMetrics(userId);
    }
}