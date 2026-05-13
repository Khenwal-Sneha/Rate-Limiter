package com.demo.ratelimiter.interceptor;

import com.demo.ratelimiter.service.RateLimiterService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RateLimitInterceptor
        implements HandlerInterceptor {

    private final RateLimiterService rateLimiterService;

    public RateLimitInterceptor(
            RateLimiterService rateLimiterService
    ) {
        this.rateLimiterService = rateLimiterService;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {

        String userId =
                request.getParameter("userId");

        response.setContentType("application/json");

        if (userId == null || userId.isBlank()) {

            response.setStatus(400);

            response.getWriter().write(
                    """
                    {
                      "status": 400,
                      "message": "Missing userId"
                    }
                    """
            );

            return false;
        }

        boolean allowed =
                rateLimiterService
                        .allowRequest(userId);

        int remaining =
                rateLimiterService
                        .remainingReq(userId);

        response.setHeader(
                "X-Rate-Limit-Remaining",
                String.valueOf(remaining)
        );

        if (!allowed) {

            response.setStatus(429);

            response.getWriter().write(
                    """
                    {
                      "status": 429,
                      "message": "Too Many Requests"
                    }
                    """
            );

            return false;
        }

        return true;
    }
}