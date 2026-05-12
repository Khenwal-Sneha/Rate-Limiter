package com.demo.ratelimiter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Rate Limiter Project Started";
    }

    @GetMapping("/status")
    public String status() {
        return "Application is running";
    }
}
