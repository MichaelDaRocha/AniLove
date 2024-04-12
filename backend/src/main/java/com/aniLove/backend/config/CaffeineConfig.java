package com.aniLove.backend.config;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.benmanes.caffeine.cache.Caffeine;

@Configuration
public class CaffeineConfig {
    @Value("${config.cache.schedule.delay}")
    private Integer clear;
    
    @Bean
    public CacheManager cacheManager(Caffeine<Object, Object> caffeine){
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(caffeine);
        cacheManager.setAsyncCacheMode(true);
        return cacheManager;
    }

    @Bean
    public Caffeine<Object, Object> caffeineBuilder(){
        Caffeine<Object, Object> cache = Caffeine.newBuilder()
            .expireAfterWrite(clear, TimeUnit.MILLISECONDS);        

        return cache;
    }
}
