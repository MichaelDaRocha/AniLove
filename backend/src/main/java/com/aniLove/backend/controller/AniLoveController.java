package com.aniLove.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.ArgumentValue;
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


    // @QueryMapping
    // public Page random(ArgumentValue<Integer> page){
    //     Page rand = aniList.generate(page);
    //     return rand;
    // }


    // @QueryMapping
    // public Page recommend(@Argument String[] flavor){
    //     Page rec = aniList.recommend(flavor);
    //     return rec;
    // }


    @QueryMapping
    public Mono<Media> find(@Argument Integer idMal){
        Mono<Media> anime = aniList.find(idMal);
        return anime;
    }
}
