package com.aniLove.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.graphql.client.ClientResponseField;
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
    final LocalDateTime currentDate;
    final DateTimeFormatter format;

    public AniLoveService(){
        WebClient webClient = WebClient.builder().baseUrl("https://graphql.anilist.co").build();
        graphQlClient = HttpGraphQlClient.builder(webClient).build();
        format = DateTimeFormatter.ofPattern("yyyyMMdd");
        currentDate = LocalDateTime.now();
    }

    public Mono<Page> generate(ArgumentValue<Integer[]> pageNum, ArgumentValue<Integer[]> notIn){
        LocalDateTime date;
        synchronized(currentDate){
            date = currentDate.minusYears(3);
        }
        Integer dateInt = Integer.parseInt(date.format(format));


        Mono<Page> animes = graphQlClient.documentName("generate")
            .variable("date", dateInt)
            .execute()
            .map(response -> {
                Page popular = response.field("popular").toEntity(Page.class);
                Page recent = response.field("recent").toEntity(Page.class);
                Page niche = response.field("niche").toEntity(Page.class);
                

                return Page.merge(popular, recent, niche);
            });

        return animes;
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
