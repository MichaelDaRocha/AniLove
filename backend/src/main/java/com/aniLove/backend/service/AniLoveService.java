package com.aniLove.backend.service;

import org.springframework.context.annotation.Bean;
import org.springframework.graphql.client.HttpGraphQlClient;
import org.springframework.graphql.data.ArgumentValue;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.aniLove.backend.data.Media;
import com.aniLove.backend.data.Page;

import reactor.core.publisher.Mono;

@Service
public class AniLoveService {
    HttpGraphQlClient graphQlClient;

    public AniLoveService(){
        WebClient webClient = WebClient.builder().baseUrl("https://graphql.anilist.co").build();
        graphQlClient = HttpGraphQlClient.builder(webClient).build();
    }

    // public Page generate(ArgumentValue<Integer> pageNum){
        
    // }

    // public Page recommend(String[] flavor){

    // }

    public Mono<Media> find(Integer idMal){
        Mono<Media> anime = graphQlClient.documentName("find")
            .variable("idMal", idMal)
            .retrieve("Media")
            .toEntity(Media.class);

        // Mono<Media> anime = graphQlClient.document("query{Media(idMal:1){title{romaji, english}}}").retrieve("Media").toEntity(Media.class);

        return anime;
    }
}
