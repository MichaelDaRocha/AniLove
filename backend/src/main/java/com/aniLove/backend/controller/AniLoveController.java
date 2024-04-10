package com.aniLove.backend.controller;

import java.util.List;

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
        return aniList.generate(page);
    }


    @QueryMapping
    public Mono<Page> recommend(@Argument Integer page, @Argument List<String> genre_in, @Argument List<Integer> id_not_in){
        return aniList.recommend(page, genre_in, id_not_in);
    }


    @QueryMapping
    public Mono<Media> find(@Argument Integer id){
        return aniList.find(id);
    }
}
