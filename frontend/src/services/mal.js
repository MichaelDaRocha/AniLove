import axios from "axios"
import config from '../config.json'

export default class MyAnimeList{
    #monthMap
    #seasonMap
    #client

    constructor(){
        this.#monthMap = [
            'winter',
            'winter',
            'winter',
            'spring',
            'spring',
            'spring',
            'summer',
            'summer',
            'summer',
            'fall',
            'fall',
            'fall'
        ]
        this.#client = axios.create({
            baseURL: config.malURL,
        })
    }

    #earliestMonth(monthNum){
        if(monthNum < 3)
            return 0
        else if(monthNum < 6)
            return 3
        else if(monthNum < 9)
            return 6
        else
            return 9
    }

    async loadSeasonalAnime(year, monthNum, loadFn){
        const str = `/anime/season/${year}/${this.#monthMap[monthNum]}?sort=anime_num_list_users&fields=start_date,media_type`
        const min_date = new Date(`${year}-${this.#earliestMonth(monthNum)+1}-01`)

        let resp = await this.#client.get(str)
    
        resp.data.data = resp.data.data.filter(anime => {
            return new Date(anime.node.start_date) >= min_date &&
                   anime.node.media_type === 'tv'
        })

        loadFn(resp.data.data)
        
        while(resp.data.paging.next){
            let offset = resp.data.paging.next.match('offset=[0-9]+')
            resp = await this.#client.get(`${str}&${offset[0]}`)
            resp.data.data = resp.data.data.filter(anime => {
                return new Date(anime.node.start_date) >= min_date &&
                       anime.node.media_type === 'tv'
            })
            loadFn(resp.data.data)
        }
    }

    async loadThisSeasonAnime(loadFn){
        const d = new Date()
        await this.loadSeasonalAnime(d.getFullYear(), d.getMonth(), loadFn)
    }

    async getShowTags(showId){
        const str = `/anime/${showId}?fields=genres`
        let resp = await this.#client.get(str)
        return resp.data
    }
}
