package com.demo.ratelimiter.controller;

import com.demo.ratelimiter.response.ApiResponse;
import com.demo.ratelimiter.service.RateLimiterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// @RestController
public class HelloController1 {

    private final RateLimiterService rateLimiterService;

    public HelloController1(
            RateLimiterService rateLimiterService
    ) {
        this.rateLimiterService = rateLimiterService;
    }

    @GetMapping("/api")
    public ResponseEntity<ApiResponse> accessApi(
            @RequestParam String userId
    ) {

        boolean allowed =
                rateLimiterService.allowRequest(userId);

        long currentTime =
                System.currentTimeMillis();

        int remRequests =
                rateLimiterService.remainingReq(userId);

        if (allowed) {

            ApiResponse response =
                    new ApiResponse(
                            "Request Allowed",
                            200,
                            currentTime,
                            remRequests
                    );

            return ResponseEntity.ok(response);
        }

        ApiResponse response =
                new ApiResponse(
                        "Too Many Requests",
                        429,
                        currentTime,
                        remRequests
                );

        return ResponseEntity
                .status(HttpStatus.TOO_MANY_REQUESTS)
                .body(response);
    }
}