import fetch from "node-fetch";
import mongodb from "mongodb";

const key = process.env.API_KEY;
const mongoUrl = process.env.MONGODB_UR
const client = new mongodb.MongoClient(mongoUrl);
const db = client.db("yt");
const ytCollection = db.collection("youtube");

const channelName = ""; //add a channelName to get the channeldid or just add the channelid manually
const channelId = ""; //some channelids can be found with the name and some can't, in this case manually it's need to be manually inserted or use a script (not implemented yet)
let idneeded = false;

main()
/**
 * if the channelid cant be found by the username its using the manually added channelId
 */
async function main(){
    const funcChannelId = await getChannelId(channelName)
    if(idneeded && channelId) await get200VideoIds(channelId)
    else await get200VideoIds(funcChannelId)
}

/**
 * Trys to get the channelId with the channelName
 * @param {String} channelName 
 * @returns {String} channeldId
 */
async function getChannelId(channelName){
    const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=id&forUsername=${channelName}&key=${key}`;
    let channelId;
    await fetch(channelUrl).then((res) => res.json()).then((channelListResponse) => {
        try {
        channelId = channelListResponse.items[0].id
    } catch (error) {
        console.log(error)
        console.log("Please fill in the channelId manually")
        idneeded = true
    }});
    return channelId;
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

