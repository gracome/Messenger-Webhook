const express = require('express');
const app = express();
const PORT = 3000;

const NRP = require("node-redis-pubsub");
// NRP initialisation
const nrp = new NRP({
    PORT: 6379,
    scope: "microservice"
});


app.post("/webhook", (req, res) => {
    let body = req.body;
  console.log(body);
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });


if (body.object === "page") {
    body.entry.forEach(function(entry) {

        
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
        
      });
       // Emit the event to the messaging micro service
       nrp.emit("NEW_MESSAGE", msg);
      
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
        if (mode === "subscribe" && token === "EAARKYqLdIJMBAEow3XhD8Rvun85i7JjwGap9sA9VLoZCtYx8frBX6s9GbZAVgh78np7WnLZCTZBrZBmNFPSQFkqv27bLXhNtXQtC2QMmF7Sb8qxWsivOn5HOv5Nx5cxHXv90rBCHILZAuQxwU1ADX1CANUdGkwo2cRgCisj4CFgrIyOLRKQC7iVuvwsoOxX6kZD") {
          console.log("WEBHOOK_VERIFIED");
          res.status(200).send(challenge);
        } else {
          res.sendStatus(403);
          
        }
      }
    });
   

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);




