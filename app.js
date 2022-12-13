const express = require('express');
const app = express();
const request = require('request');


const PORT = 3000;
app.listen(PORT, (error) =>{
    if(!error) {
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    }else {
        console.log("Error occurred, server can't start", error);
    }
}
);

app.post("/webhook", (req, res) => {
    let body = req.body;
  
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });


if (body.object === "page") {
    body.entry.forEach(function(entry) {

        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      
      
        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        console.log('Sender PSID: ' + sender_psid);
      
        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);        
        } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
        }
        
      });    

  
}
app.get("/messaging-webhook", (req, res) => {
  
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
  
    
      if (mode && token) {
        if (mode === "subscribe" && token === "EAARKYqLdIJMBAEow3XhD8Rvun85i7JjwGap9sA9VLoZCtYx8frBX6s9GbZAVgh78np7WnLZCTZBrZBmNFPSQFkqv27bLXhNtXQtC2QMmF7Sb8qxWsivOn5HOv5Nx5cxHXv90rBCHILZAuQxwU1ADX1CANUdGkwo2cRgCisj4CFgrIyOLRKQC7iVuvwsoOxX6kZD") {
          console.log("WEBHOOK_VERIFIED");
          res.status(200).send(challenge);
        } else {
          res.sendStatus(403);

        }
      }
    });
   

  


})


// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

  // Check if the message contains text
  if (received_message.text) {    

    // Create the payload for a basic text message
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  }  
  
  // Sends the response message
  callSendAPI(sender_psid, response); 

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
     // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://messenger-w5t8.onrender.com/me/messages",
    "qs": { "access_token": "EAARKYqLdIJMBAEow3XhD8Rvun85i7JjwGap9sA9VLoZCtYx8frBX6s9GbZAVgh78np7WnLZCTZBrZBmNFPSQFkqv27bLXhNtXQtC2QMmF7Sb8qxWsivOn5HOv5Nx5cxHXv90rBCHILZAuQxwU1ADX1CANUdGkwo2cRgCisj4CFgrIyOLRKQC7iVuvwsoOxX6kZD" },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}