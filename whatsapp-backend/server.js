// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

// config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1141175",
    key: "c2ce299e506182667086",
    secret: "8e2d025430c9098b6813",
    cluster: "mt1",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Accsess-Control-Allow-Origin","*");
    res.setHeader("Accsess-Control-Allow-Headers","*");
    next();
});

// DB config
const connection_url = "mongodb+srv://admin:IIBE7P3e3j08cX6o@cluster0.wveii.mongodb.net/whatsappdb?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
useCreateIndex: true,
useCreateIndex: true,
useUnifiedTopology: true
})

const db = mongoose.connection
db.once("open",() =>{
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change",(change) => {
        console.log(change);
    if (change.operationType === "insert")
    {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted",
        {
            name : messageDetails.user,
            message : messageDetails.message,    
            timestamp: messageDetails.timestamp,
            recieved: messageDetails.recieved,
        }
        );
    }
    else {
        console.log("Error trigering pusher")
    }
    });
});


//????

//api routes
app.get("/",(req,res)=>res.status(200).send("hello world"))

app.get("/messages/sync", (req,res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
    })

app.post("/messages/new", (req,res) => { 
        const dbMessage = req.body
Messages.create(dbMessage, (err, data) => {
    if(err) {
        res.status(500).send(err)
    } else {
        res.status(200).send(data)
    }
})
})


//listen
app.listen(port, () => console.log('Listening on localhost:${port}')) 