import express from "express";
import mongodb from "mongodb";
import fetch from "node-fetch";
import cors from "cors";

const key = process.env.API_KEY;

const mongoUrl = process.env.MONGODB_URL;
const client = new mongodb.MongoClient(mongoUrl);
const db = client.db("yt");
const ytCollection = db.collection("youtube");

const app = express();

app.use(cors())

async function getNumbers(){

    await client.connect()
    const cursor = ytCollection.aggregate([{$sample : {size:1}}]);

    let channelVidsData = []
    for await (const doc of cursor) channelVidsData = doc;
    const rndNumberPart = Math.floor(Math.random()*channelVidsData.vidInfos.length);
    const rndNumberVid = Math.floor(Math.random()*channelVidsData.vidInfos[rndNumberPart].items.length);
    const itemKind = channelVidsData.vidInfos[rndNumberPart].items[rndNumberVid].id.kind
    if(itemKind !== "youtube#video") return await getNumbers() //In case it's not a youtube video it's gonna roll again

    return channelVidsData.vidInfos[rndNumberPart].items[rndNumberVid].id.videoId
}

app.get("/getVidData", async(req, res)=>{
    
    const vidId = await getNumbers()

    let channelTitle, videoTitel, publishedAt="", views = "", thumbnailURL;
    const urlVideo = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${vidId}&key=${key}`;
    await fetch(urlVideo).then((res)=> res.json().then((data)=> {
        channelTitle = data.items[0].snippet.channelTitle;
        videoTitel = data.items[0].snippet.title;
        publishedAt = data.items[0].snippet.publishedAt;
        views = data.items[0].statistics.viewCount
        thumbnailURL = data.items[0].snippet.thumbnails.high.url //ist besser gibt es aber nur fast immer thumbnailURL = data.items[0].snippet.thumbnails.maxres.url;
    }))

    res.send({"channelTitle": channelTitle, "videoTitel": videoTitel, "publishedAt": publishedAt.substring(0,10), "views": views, "thumbnailURL": thumbnailURL, "videoId": vidId})
})

app.listen(5050, ()=>{
    console.log("listening on port 5050")
})

export default app;