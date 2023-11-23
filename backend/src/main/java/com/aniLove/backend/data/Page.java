package com.aniLove.backend.data;

public class Page {
    public static class PageInfo{
        private int total;
        private int perPage;
        private int currentPage;
        private int lastPage;
        private boolean hasNextPage;

        public PageInfo(int total, int perPage, int currentPage, int lastPage, boolean hasNextPage){
            this.total = total;
            this.perPage = perPage;
            this.currentPage = currentPage;
            this.lastPage = lastPage;
            this.hasNextPage = hasNextPage;
        }

        public int getTotal(){return total;}
        public int getPerPage(){return perPage;}
        public int getCurrentPage(){return currentPage;}
        public int getLastPage(){return lastPage;}
        public boolean getHasNextPage(){return hasNextPage;}
    }

    private PageInfo pageInfo;
    private Media[] media;

    public Page(PageInfo pageInfo, Media[] media){
        this.pageInfo = pageInfo;
        this.media = media;
    }

    public PageInfo getPageInfo(){return pageInfo;}
    public Media[] getMedia(){return media;}
}
