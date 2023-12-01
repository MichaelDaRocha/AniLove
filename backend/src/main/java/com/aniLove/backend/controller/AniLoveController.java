package com.aniLove.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.aniLove.backend.data.Media;
import com.aniLove.backend.data.Page;
import com.aniLove.backend.service.AniLoveService;

import reactor.core.publisher.Mono;

@Controller
public class AniLoveController {
    
    @Autowired
    private AniLoveService aniList;

    @QueryMapping
    public Mono<Page> generate(@Argument Integer page){
        Mono<Page> rand = aniList.generate(page);
        return rand;
    }


    // @QueryMapping
    // public Mono<Page> recommend(@Argument String[] flavor){
    //     Mono<Page> rec = aniList.recommend(flavor);
    //     return rec;
    // }


    @QueryMapping
    public Mono<Media> find(@Argument Integer idMal){
        Mono<Media> anime = aniList.find(idMal);
        return anime;
    }
}
