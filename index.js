const app = require('express')()
const bodyParser = require('body-parser')
require('dotenv').config()

// GET home route
app.get('/', (req, res) => {
    res.send("Well hello there, now this is a NodeJS server!")
})

app.get('/', (req, res) => {
    
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
