package com.aniLove.backend.data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

public class Page {
    public static class PageInfo{
        private Integer total;
        private Integer currentPage;
        private Integer lastPage;
        private Boolean hasNextPage;

        public PageInfo(Integer total, Integer currentPage, Integer lastPage, Boolean hasNextPage){
            this.total = total;
            this.currentPage = currentPage;
            this.lastPage = lastPage;
            this.hasNextPage = hasNextPage;
        }

        public Integer getTotal(){return total;}
        public Integer getCurrentPage(){return currentPage;}
        public Integer getLastPage(){return lastPage;}
        public Boolean hasNextPage(){return hasNextPage;}

        public void setTotal(Integer total){this.total = total;}
        public void setCurrentPage(Integer currentPage){this.currentPage = currentPage;}
        public void setLastPage(Integer lastPage){this.lastPage = lastPage;}
        public void setHasNextPage(Boolean hasNextPage){this.hasNextPage = hasNextPage;}
    }

    private PageInfo pageInfo;
    private List<Media> media;

    public Page(PageInfo pageInfo, List<Media> media){
        this.pageInfo = pageInfo;
        this.media = media;
    }

    public static Page merge(Page... pages){
        Page ret;

        {            
            PageInfo tmpInfo = pages[0].getPageInfo();
            List<Media> tmpMedia = pages[0].getMedia();

            PageInfo retInfo = null;
            List<Media> retMedia = null;

            if(tmpInfo != null){
                retInfo = new PageInfo(
                    tmpInfo.getTotal(), 
                    tmpInfo.getCurrentPage(), 
                    tmpInfo.getLastPage(),
                    tmpInfo.hasNextPage()
                );
            }
            if(tmpMedia != null){
                retMedia = new ArrayList<Media>();
            }

            ret = new Page(retInfo, retMedia);
        }

        PageInfo retInfo = ret.getPageInfo();
        List<Media> retMedia = ret.getMedia();

        HashSet<Integer> dups = new HashSet<Integer>();
        for(Page page : pages){
            PageInfo pInfo = page.getPageInfo();
            List<Media> pMedia = page.getMedia();

            if(pInfo != null){
                if(pInfo.getTotal() != null)
                    retInfo.setTotal(Math.max(retInfo.getTotal(), pInfo.getTotal()));
                if(pInfo.getCurrentPage() != null)
                    retInfo.setCurrentPage(Math.min(retInfo.getCurrentPage(), pInfo.getCurrentPage()));
                if(pInfo.getLastPage() != null)
                    retInfo.setLastPage(Math.max(retInfo.getLastPage(), pInfo.getLastPage()));
                if(pInfo.hasNextPage() != null)
                    retInfo.setHasNextPage(retInfo.hasNextPage() || pInfo.hasNextPage());
            }

            if(pMedia != null){
                for(Media anime : pMedia){
                    if(!dups.contains(anime.getId())){
                        retMedia.add(anime);
                        dups.add(anime.getId());
                    }
                }
            }
        }

        Collections.shuffle(retMedia);
        return ret;
    }

    public PageInfo getPageInfo(){return pageInfo;}
    public List<Media> getMedia(){return media;}
}
