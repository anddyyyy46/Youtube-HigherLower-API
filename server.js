import express from "express";
import mongodb from "mongodb";
import fetch from "node-fetch";
import cors from "cors";

const key = "AIzaSyAEmYkosB6Anv2wTMJ6CLgsPeroBerhnfA";

const mongoUrl = "mongodb+srv://andy:HY7R9slqLwy2x1Gx@cluster0.pehv5kt.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(mongoUrl);
const db = client.db("yt");
const ytCollection = db.collection("youtube");

const app = express();

app.use(cors())

async function getNumbers(){
    await client.connect()
    const cursor = ytCollection.aggregate([{$sample : {size:1}}]);
    
    let vidId;
    let channelVidsData = []
    for await (const doc of cursor){
        channelVidsData = doc;
        //vidId = doc.vidInfos[rndNumberPart].items[rndNumberVid].id.videoId;
    }
    console.log(channelVidsData)
    console.log(channelVidsData.ytChannel)
    console.log(channelVidsData.vidInfos.length)
    const rndNumberPart = Math.floor(Math.random()*channelVidsData.vidInfos.length);
    const rndNumberVid = Math.floor(Math.random()*channelVidsData.vidInfos[rndNumberPart].items.length);//das letzte Objekt (eigentlich nur von letzten part) ist kein video
    console.log(rndNumberPart)
    console.log(rndNumberVid);
    const itemKind = channelVidsData.vidInfos[rndNumberPart].items[rndNumberVid].id.kind
    console.log(itemKind)
    if(itemKind !== "youtube#video") return await getNumbers()
    vidId = channelVidsData.vidInfos[rndNumberPart].items[rndNumberVid].id.videoId
    console.log(vidId)
    return vidId
}

app.get("/getViewsThumbnail", async(req, res)=>{
    
    
    const vidId = await getNumbers()

    let channelTitle, videoTitel, publishedAt, views, thumbnailURL;
    const urlVideo = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${vidId}&key=${key}`;
    await fetch(urlVideo).then((res)=> res.json().then((data)=> {
        channelTitle = data.items[0].snippet.channelTitle;
        videoTitel = data.items[0].snippet.title;
        publishedAt = data.items[0].snippet.publishedAt;
        views = data.items[0].statistics.viewCount
        thumbnailURL = data.items[0].snippet.thumbnails.high.url //ist besser gibt es aber nur fast immer thumbnailURL = data.items[0].snippet.thumbnails.maxres.url;
    }))
    
    res.send({"channelTitle": channelTitle, "videoTitel": videoTitel, "publishedAt": publishedAt, "views": views, "thumbnailURL": thumbnailURL, "videoId": vidId})
})

app.listen(5050, ()=>{
    console.log("listening on port 5050")
})