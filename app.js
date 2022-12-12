const express = require('express');
bodyParser = require("body-parser"),
{ urlencoded, json } = require("body-parser"),
 app = express().use(bodyParser.json());


const PORT = 3000;


app.post("/webhook", (req, res) => {
    let body = req.body;
  
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });


if (body.object === "page") {
    res.status(200).send("EVENT_RECEIVED");

  } else {
    res.sendStatus(404);
  }

  
}); 
app.get("/messaging-webhook", (req, res) => {
  
      let mode = req.query["hub.mode"];
      let token = req.query["hub.verify_token"];
      let challenge = req.query["hub.challenge"];
    
      if (mode && token) {
        if (mode === "subscribe" && token === config.verifyToken) {
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

function verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature-256"];
  
    if (!signature) {
      console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
    } else {
      var elements = signature.split("=");
      var signatureHash = elements[1];
      var expectedHash = crypto
        .createHmac("sha256", config.appSecret)
        .update(buf)
        .digest("hex");
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }