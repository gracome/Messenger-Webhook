const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const {getProfileInformations}= require('./profile');

app.use(bodyParser.json())

const NRP = require("node-redis-pubsub");

var url = process.env.REDIS_URL;

var config = {
    url: url

    
};


var nrp = new NRP(config);




app.post("/messaging-webhook", (req, res) => {
  let body = req.body;
  console.log(body);
  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });


  if (body.object === "page") {
    body.entry.forEach(async function (entry) {

      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      let send_id = webhook_event.sender.id;
      let recipient = webhook_event.recipient.id;
      let msg = webhook_event.message.text;
      let ms_id= webhook_event.message.mid
      let profile= await getProfileInformations(send_id); 
      let content = { send_id, recipient,ms_id, msg, profile }
      console.log(content);
      // Emit the event to the messaging micro service
        nrp.emit("NEW_MESSAGE", content);
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
    if (mode === "subscribe" && token === "EAAMCYhtmZBEoBAOTC4ZBPNZAnJ2gxkwhy5MAhIZAnhv2wwhlwBZCoX06BbrpfhsiG6ZARsH7e9WKlx8Mivr7MudsrZAD99DNa6y9gtcGUafG3IQeZCy5TIboshSfZAC4ZCJx9VXg2ZAJETy5Fevk5wSIZBfkM6SgsXwH1VHdke3H4NUpxi8u5Qxx7vA4uXSqFz3MPDIZD") {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);

    }
  }
});

app.get("/test",async (req,res) =>{
 await getProfileInformations();
}), 

app.listen(PORT, () => {

  // if(!error)
  console.log("Server is Successfully Running,and App is listening on port " + PORT)
  nrp.on("NEW_MESSAGE", data => {
    console.log(data);
   // Call messenger service to handle the incomming message
   // If no error has occured then emit on socket io for the front app
  },
  
  );

 

  // else 
  //     console.log("Error occurred, server can't start", error);
}
);




