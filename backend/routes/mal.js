const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('../config.json')
const secret = require('../secret.json')

const MyAnimeListClient = axios.create({
    baseURL: config.malAPI,
    headers: {"X-MAL-CLIENT-ID": secret.malId}
})

router.all('*', async (req, res) => {
    const route = req.url

    try{
        var resp = await MyAnimeListClient.get(route)
    }catch(err){
        res.send(err)
        return
    }
    
    res.send(resp.data)
})

module.exports = router