package com.aniLove.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.Cache.ValueWrapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.graphql.client.HttpGraphQlClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.aniLove.backend.data.Media;
import com.aniLove.backend.data.Page;

import reactor.core.publisher.Mono;

@Service
public class AniLoveService {
    @Autowired
    CacheManager cacheManager;
    HttpGraphQlClient graphQlClient;

    final LocalDateTime currentDateMin3y;
    final DateTimeFormatter format;
    final Integer idCacheKey;

    public AniLoveService(){
        WebClient webClient = WebClient.builder().baseUrl("https://graphql.anilist.co").build();
        graphQlClient = HttpGraphQlClient.builder(webClient).build();
        format = DateTimeFormatter.ofPattern("yyyyMMdd");
        currentDateMin3y = LocalDateTime.now().minusYears(3);
        idCacheKey = 0;
    }

    @Cacheable(value = "generate", sync = true)
    public Mono<Page> generate(Integer page){
        System.out.println("GENERATING!");
        Integer dateInt = Integer.parseInt(currentDateMin3y.format(format));

        Mono<Page> animes = graphQlClient.documentName("generate")
            .variable("date", dateInt)
            .variable("page", page)
            .execute()
            .map(response -> {
                Page popular = response.field("popular").toEntity(Page.class);
                Page recent = response.field("recent").toEntity(Page.class);
                Page niche = response.field("niche").toEntity(Page.class);
                
                Page ret = Page.merge(popular, recent, niche);
                List<Media> retMedia = ret.getMedia();
                readUpdateSaveId(cacheManager, retMedia);

                return ret;
            });

        return animes;
    }

    @Scheduled(fixedDelayString = "${config.cache.schedule.delay}", initialDelayString ="${config.cache.schedule.initialDelay}")
    @Caching(evict = {
        @CacheEvict(value="generate", allEntries = true),
        @CacheEvict(value="id", allEntries = true)
    })
    public void clearGenCache(){}

    public synchronized void readUpdateSaveId(CacheManager cacheManager, List<Media> media){
        Cache cache = cacheManager.getCache("id");
        ValueWrapper wrapper = cache.get(idCacheKey);
        final HashSet<Integer> idSet;
        if(wrapper == null){
            idSet = new HashSet<Integer>();
            cache.put(idCacheKey, idSet);
        } else{
            idSet = (HashSet<Integer>) wrapper.get();
        }

        media.removeIf(anime -> !idSet.add(anime.getId()));
    }

    // public Page recommend(String[] flavor){

    // }

    public Mono<Media> find(Integer id){
        
        Mono<Media> anime = graphQlClient.documentName("find")
            .variable("id", id)
            .retrieve("Media")
            .toEntity(Media.class);

        return anime;
    }
}
