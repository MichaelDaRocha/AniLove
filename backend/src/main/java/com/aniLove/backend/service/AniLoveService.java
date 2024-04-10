package com.aniLove.backend.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.Cache.ValueWrapper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.graphql.client.HttpGraphQlClient;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.aniLove.backend.data.Media;
import com.aniLove.backend.data.Page;
import com.aniLove.backend.data.Time;

import reactor.core.publisher.Mono;

@Service
public class AniLoveService {
    @Autowired
    CacheManager cacheManager;
    HttpGraphQlClient graphQlClient;

    public AniLoveService(@Value("${config.anilist.baseurl}") String baseUrl){
        WebClient webClient = WebClient.builder().baseUrl(baseUrl).build();
        graphQlClient = HttpGraphQlClient.builder(webClient).build();
    }

    @Cacheable(value = "generate", sync = true)
    public Mono<Page> generate(Integer page){
        page = page == null ? 1 : page;

        Cache cache = cacheManager.getCache("seen");
        ValueWrapper wrapper = cache != null ? cache.get("seen") : null;
        LinkedList<Integer> seen = wrapper != null ? (LinkedList<Integer>) wrapper.get() : new LinkedList<>();

        return graphQlClient.documentName("generate")
            .variable("page", page)
            .variable("id_not_in", seen)
            .variable("date", Time.past)
            .execute()
            .map(response -> {
                Page popular = response.field("popular").toEntity(Page.class);
                Page recent = response.field("recent").toEntity(Page.class);
                Page niche = response.field("niche").toEntity(Page.class);
                Page finPage = Page.merge(popular, recent, niche);
                
                finPage.getMedia().forEach(media -> seen.add(media.getId()));
                cache.put("seen", seen);

                return finPage;
            });
    }

    @Cacheable(value = "recommend", sync = true)
    public Mono<Page> recommend(Integer page, List<String> genre_in, List<Integer> id_not_in){
        id_not_in = id_not_in == null ? new LinkedList<>() : id_not_in;

        return graphQlClient.documentName("recommend")
                .variable("page", page)
                .variable("genre_in", genre_in)
                .variable("id_not_in", id_not_in)
                .variable("date", Time.past)
                .execute()
                .map(response -> {
                    Page popular = response.field("popular").toEntity(Page.class);
                    Page recent = response.field("recent").toEntity(Page.class);
                    Page niche = response.field("niche").toEntity(Page.class);
                    return Page.merge(popular, recent, niche);
                });
    }

    @Cacheable(value = "find", sync = true)
    public Mono<Media> find(Integer id){
        return graphQlClient.documentName("find")
            .variable("id", id)
            .retrieve("Media")
            .toEntity(Media.class);
    }
}
