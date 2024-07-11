package com.aniLove.backend.data;

import org.jsoup.Jsoup;

public class Media {
    public static class Title{
        private String romaji;
        private String english;

        public Title(String romaji, String english){
            this.romaji = romaji;
            this.english = english;
        }

        public String getRomaji(){return romaji;}
        public String getEnglish(){return english;}
    }

    public static class CoverImage{
        private String medium;
        private String large;
        private String extraLarge;

        public CoverImage(String medium, String large, String extraLarge){
            this.medium = medium;
            this.large = large;
            this.extraLarge = extraLarge;
        }

        public String getMedium(){return medium;}
        public String getLarge(){return large;}
        public String getExtraLarge(){return extraLarge;}
    }

    private int id;
    private int idMal;
    private Title title;
    private CoverImage coverImage;
    private String description;
    private String bannerImage;
    private String[] genres;

    public Media(int id, int idMal, Title title, CoverImage coverImage, String description, String bannerImage, String[] genres){
        this.id = id;
        this.idMal = idMal;
        this.title = title;
        this.coverImage = coverImage;
        this.description = Jsoup.parse(description).text();
        this.bannerImage = bannerImage;
        this.genres = genres;
    }

    public int getId(){return id;}
    public int getMalId(){return idMal;}
    public Title getTitle(){return title;}
    public CoverImage getCoverImage(){return coverImage;}
    public String getDescription(){return description;}
    public String getBannerImage(){return bannerImage;}
    public String[] getGenres(){return genres;}
}
