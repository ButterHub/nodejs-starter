'use strict'

const app = require('express')()
const bodyParser = require('body-parser')
const { handleMessage, handlePostback } = require('./handlers')
require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const  VERIFY_TOKEN = process.env.TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.get('/', (req, res) => {
    // console.log({req})
    res.send(req.headers["x-real-ip"]);
})

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });

// Handler
const entryHandler = entry => {
    const webhook_event = entry.messaging[0];
    const sender_psid = webhook_event.sender.id;

    if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
    } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
    } else {
        throw 'Unsupported webhook event.'
    }
}

app.post('/webhook', (req, res) => {
    try {
        if (req.body.object == 'page') {
            req.body.entry.forEach(entry => {
                entryHandler(entry);
            })
            res.send("Event received.");
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        res.status(400).send(e);
    }
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
