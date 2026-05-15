package com.demo.ratelimiter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.data.redis.connection.RedisStandaloneConfiguration;

import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;

import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

@Configuration
public class RedisConfig {

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {

        RedisStandaloneConfiguration config =
                new RedisStandaloneConfiguration();

        config.setHostName(
                System.getenv("REDIS_HOST")
        );

        config.setPort(
                Integer.parseInt(
                        System.getenv("REDIS_PORT")
                )
        );

        config.setPassword(
                System.getenv("REDIS_PASSWORD")
        );

        LettuceClientConfiguration clientConfig =
                LettuceClientConfiguration
                        .builder()
                        .useSsl()
                        .build();

        return new LettuceConnectionFactory(
                config,
                clientConfig
        );
    }
}