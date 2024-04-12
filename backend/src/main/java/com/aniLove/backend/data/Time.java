package com.aniLove.backend.data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Time {
    public static Integer cur;
    public static Integer past;

    private static final DateTimeFormatter format;
    static {
        format = DateTimeFormatter.ofPattern("yyyyMMdd");
    }

    @Scheduled(fixedDelayString = "${config.time.schedule.delay}", initialDelay = 0)
    private static void update(){
        LocalDateTime local = LocalDateTime.now();
        cur = Integer.parseInt(format.format(local));
        past = Integer.parseInt(format.format(local.minusYears(3)));
    }
}
