package com.demo.ratelimiter.interceptor;

import com.demo.ratelimiter.factory.RateLimiterFactory;
import com.demo.ratelimiter.metrics.UserMetricsService;
import com.demo.ratelimiter.model.RateLimitAlgorithm;
import com.demo.ratelimiter.strategy.RateLimitingStrategy;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RateLimitInterceptor
        implements HandlerInterceptor {

    private final RateLimiterFactory
            rateLimiterFactory;

    private final UserMetricsService
            userMetricsService;

    public RateLimitInterceptor(
            RateLimiterFactory rateLimiterFactory,
            UserMetricsService userMetricsService
    ) {

        this.rateLimiterFactory =
                rateLimiterFactory;

        this.userMetricsService =
                userMetricsService;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {

        System.out.println(
                "Interceptor Hit"
        );

        if (
            request.getMethod()
                    .equals("OPTIONS")
        ) {

            return true;
        }

        response.setContentType(
                "application/json"
        );

        String userId =
                request.getParameter(
                        "userId"
                );

        if (
            userId == null
            ||
            userId.isBlank()
        ) {

            response.setStatus(400);

            response.getWriter().write(
                    """
                    {
                      "status": 400,
                      "message": "Missing userId",
                      "remainingRequests": 0
                    }
                    """
            );

            return false;
        }

        String algorithmParam =
                request.getParameter(
                        "algorithm"
                );

        System.out.println(
                "Algorithm Param: "
                + algorithmParam
        );

        if (
            algorithmParam == null
            ||
            algorithmParam.isBlank()
        ) {

            algorithmParam =
                    "TOKEN_BUCKET";
        }

        RateLimitAlgorithm algorithm =
                RateLimitAlgorithm.valueOf(
                        algorithmParam
                );

        RateLimitingStrategy strategy =
                rateLimiterFactory
                        .getStrategy(
                                algorithm
                        );

        System.out.println(
                "Using Strategy: "
                +
                strategy.getClass()
                        .getSimpleName()
        );

        boolean allowed =
                strategy.allowRequest(
                        userId
                );

        int remaining =
                strategy.remainingRequests(
                        userId
                );

        response.setHeader(
                "X-Rate-Limit-Remaining",
                String.valueOf(
                        remaining
                )
        );

        if (!allowed) {

            userMetricsService
                    .recordBlockedRequest(
                            userId,
                            algorithm.name()
                    );

            response.setStatus(429);

            response.getWriter().write(
                    String.format(
                            """
                            {
                              "status": 429,
                              "message": "Too Many Requests",
                              "remainingRequests": %d
                            }
                            """,
                            remaining
                    )
            );

            return false;
        }

        userMetricsService
                .recordAllowedRequest(
                        userId,
                        algorithm.name()
                );

        return true;
    }
}