const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('../config.json')
const secret = require('../secret.json')

const client = axios.create({
    baseURL: config.malAPI,
    headers: {"X-MAL-CLIENT-ID": secret.malId}
})

router.all('*', (req, res) => {
    client.get().then(val => {
        res.send(val.data)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router