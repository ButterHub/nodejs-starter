const request = require('request')
require('dotenv').config()
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;
    if (received_message.attachments) {
        const attachment_url = received_message.attachments[0].payload.url;
        
        let elements = [];
        
        // TODO call python database, await response
        // TODO iterate over response, formatting titles with value

        // // MOCK DATA:
        elements.push({
            "title": "Health",
            "subtitle": "How it affects you.",
            "image_url": "https://images.unsplash.com/photo-1571942794153-c66861c8d1a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
            "default_action": {
                "type": "web_url",
                "url": "https://orth.uk",
                "messenger_extensions": false,
                "webview_height_ratio": "tall"
            },
            "buttons": [
                {
                    "title": "How its calculated.",
                    "type": "postback",
                    "payload": "payload"
                }
            ],
        })

        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements,
                }
            }
        }

    } else if (received_message.text) {
        console.log("Entered text.")
        response = {
            "text": `Text is not currently supported. Send a barcode to analyse the product.`
        };
    } 

    callSendAPI(sender_psid, response)
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    const request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {"access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body,
    }, (err, res, body) => {
        console.log(res)
        if (!err) {
            console.log("SendAPI success.")
        } else {
            console.log(`SendAPI error: ${err}`)
        }
    })
}

module.exports = {
    handleMessage,
    handlePostback,
    callSendAPI,
}