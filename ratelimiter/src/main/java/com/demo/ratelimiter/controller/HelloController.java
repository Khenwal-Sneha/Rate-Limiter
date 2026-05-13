package com.demo.ratelimiter.controller;

import org.springframework.web.bind.annotation.RestController;

import com.demo.ratelimiter.response.ApiResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class HelloController {
    @GetMapping("/api")
    public ResponseEntity<ApiResponse> accessApi(@RequestParam String userId) {
        ApiResponse response=new ApiResponse(
            "API Access Successful",
            200,
            System.currentTimeMillis(),
            0
        );
        return ResponseEntity.ok(response);
    }
    
}
