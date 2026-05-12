package com.demo.ratelimiter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.ratelimiter.service.RateLimiterService;

@RestController
public class HelloController {
    private final RateLimiterService rateLimiterService;

    public HelloController(RateLimiterService rateLimiterService){
        this.rateLimiterService=rateLimiterService;
    }

    @GetMapping("/api")
    public String accessApi(@RequestParam String userId){
        boolean allowed=rateLimiterService.allowRequest(userId);

        if(allowed){
            return "Request Allowed";
        }

        return "Too Many Requests";
    }
}
