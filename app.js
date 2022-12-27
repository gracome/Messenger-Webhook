const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser= require('body-parser')

app.use(bodyParser.json())

const NRP = require("node-redis-pubsub");
const url = process.env.REDIS_URL;

const config = {
    url: url
};

var nrp = new NRP(config);




app.post("/messaging-webhook", (req, res) => {
    let body = req.body;
  console.log(body);
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });


if (body.object === "page") {
    body.entry.forEach(function(entry) {
       
        let webhook_event = entry.messaging[0];
         console.log(webhook_event);
let send_id= webhook_event.sender;
let recipient= webhook_event.recipient;
let msg= webhook_event.message.text;
         
    let content= {send_id, recipient,msg}
    console.log(content);
        // Emit the event to the messaging micro service
         nrp.emit("NEW_MESSAGE",  "bonjour");
      
        });
 
        

      res.status(200).send('EVENT_RECEIVED');
  
    } else {
      res.sendStatus(404);
    }
  
  });
app.get("/messaging-webhook", (req, res) => {
  
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
  
    
      if (mode && token) {
        if (mode === "subscribe" && token === "EAAMCYhtmZBEoBAJrcZCknIioyGEiMP8P3VmjoL9wUXnbtcYAgzfvwXWySJoZCB6jzm0TUZCKm9oyMpTdHDrVk8qtXKZATXNsbqPW1vFUaSheXZAKuN5rHX3AAficGFFUy2U1GfJxCz8SJTiDoGWuN3azM5iyEZAglmlU7wusM8M3YQEy8F0R3gHZAMhvsgUqhH8ZD") {
          console.log("WEBHOOK_VERIFIED");
          res.status(200).send(challenge);
        } else {
          res.sendStatus(403);
          
        }
      }
    });
   

  
app.listen(PORT, () =>{      

    // if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    // else 
    //     console.log("Error occurred, server can't start", error);
    }
);




