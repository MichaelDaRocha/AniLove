const express = require('express')
const cors = require('cors')
const mal = require('./routes/mal')

const app = express()
const port = 3001


app.use(cors())
app.use('/mal', mal)

app.listen(port,() => {
    console.log(`Listening on port ${port}`)
})