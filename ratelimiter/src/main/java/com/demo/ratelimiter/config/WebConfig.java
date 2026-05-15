package com.demo.ratelimiter.config;

import com.demo.ratelimiter.interceptor.RateLimitInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig
        implements WebMvcConfigurer {

    @Autowired
    private RateLimitInterceptor
            rateLimitInterceptor;

    @Override
    public void addInterceptors(
            InterceptorRegistry registry
    ) {

        registry.addInterceptor(
                rateLimitInterceptor
        )
        .excludePathPatterns(
                "/metrics"
        );
    }

    @Override
    public void addCorsMappings(
            CorsRegistry registry
    ) {

        registry.addMapping("/**")
                .allowedOrigins(
                        "https://your-vercel-url.vercel.app"
                )
                .allowedMethods(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
                .allowedHeaders("*")
                .exposedHeaders(
                        "X-Rate-Limit-Remaining"
                );
    }
}