import fetch from "node-fetch";
import mongodb from "mongodb";

const key = process.env.API_KEY;
const mongoUrl = process.env.MONGODB_URL
const client = new mongodb.MongoClient(mongoUrl);
const db = client.db("yt");
const ytCollection = db.collection("youtube");

const channelName = "MaxFosh"; //add a channelName to get the channeldid or just add the channelid manually

main()

/**
 * if the channelid cant be found by the username its using the manually added channelId
 */
async function main(){
    console.log(await getChannelId(channelName))
    await get200VideoIds(await getChannelId(channelName))
}

/**
 * Trys to get the channelId with the channelName
 * @param {String} channelName 
 * @returns {String} channeldId
 */
async function getChannelId(channelName){
    const response = await fetch("https://www.youtube.com/@"+channelName)
    const html = await response.text()
    const searchTerm = "?channel_id"
    return html.substring(html.indexOf(searchTerm)+searchTerm.length+1, html.indexOf(searchTerm)+searchTerm.length+25)
}


/**
 * Get the 200 latest video ids from a requested channel
 * @param {String} channelName 
 */
async function get200VideoIds(channelId){
    if(!channelId) return;
    let nextPageToken = null;
    let last200VidsInformation = [];
    let objLastVidsInfos = {"ytChannel": channelName, "vidInfos": last200VidsInformation};
    
    for(let i = 0; i < 4; i++){
        let urlVidIds = `https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&channelId=${channelId}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}`: ""}&order=date&key=${key}`;
        await fetch(urlVidIds).then((res)=> res.json()).then((data)=>{
            nextPageToken = data.nextPageToken ? data.nextPageToken : null; 
            last200VidsInformation.push(data);
        })
        if(!nextPageToken) break;
        
    }
    await client.connect();
    await ytCollection.insertOne(objLastVidsInfos);
    await client.close();
    console.log("worked")
}

