package com.demo.ratelimiter.factory;

import com.demo.ratelimiter.model.RateLimitAlgorithm;
import com.demo.ratelimiter.service.FixedWindowStrategy;
import com.demo.ratelimiter.service.SlidingWindowStrategy;
import com.demo.ratelimiter.strategy.RateLimitingStrategy;
import com.demo.ratelimiter.service.TokenBucketStrategy;
import org.springframework.stereotype.Component;

@Component
public class RateLimiterFactory {

    private final TokenBucketStrategy
            tokenBucketStrategy;

    private final FixedWindowStrategy
            fixedWindowStrategy;

    private final SlidingWindowStrategy
            slidingWindowStrategy;

    public RateLimiterFactory(
            TokenBucketStrategy tokenBucketStrategy,
            FixedWindowStrategy fixedWindowStrategy, 
            SlidingWindowStrategy slidingWindowStrategy
    ){

        this.tokenBucketStrategy =
                tokenBucketStrategy;

        this.fixedWindowStrategy =
                fixedWindowStrategy;
            
        this.slidingWindowStrategy =
                slidingWindowStrategy;
    }

    public RateLimitingStrategy getStrategy(
            RateLimitAlgorithm algorithm
    ) {

        return switch (algorithm) {

            case TOKEN_BUCKET ->
                    tokenBucketStrategy;

            case FIXED_WINDOW ->
                    fixedWindowStrategy;

            case SLIDING_WINDOW ->
                    slidingWindowStrategy;

            default ->
                    tokenBucketStrategy;
        };
    }
}