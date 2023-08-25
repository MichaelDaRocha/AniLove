import axios from "axios"
import config from '../config.json'

export default class MyAnimeList{
    #monthMap
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

    async loadSeasonalAnime(year, monthNum, loadFn){
        const str = `/anime/season/${year}/${this.#monthMap[monthNum]}?sort=anime_num_list_users`

        let resp = await this.#client.get(str)
        loadFn(resp.data.data)
        
        while(resp.data.paging.next){
            let offset = resp.data.paging.next.match('offset=[0-9]+')
            resp = await this.#client.get(`${str}&${offset[0]}`)
            loadFn(resp.data.data)
        }
    }
}
