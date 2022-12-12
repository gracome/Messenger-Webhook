const express = require('express');
const app = express();


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
  
      let mode = req.query["suscribe"];
      let token = req.query["110015668622854"];
      let challenge = req.query["mytoken"];
    
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




