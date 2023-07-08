# Youtube-HigherLower-API
  This API is used by my "Youtube-HigherLower-FrontEnd" repository. The API takes a videoid from the database, which was filled by script.js and uses this id
  several data about the video from the youtube API.

### Live-Demo: https://youtube-higher-lower-api.vercel.app/getVidData
  
## Describtion for the script:
  The core idea is to get the videoId of the last 200 Videos somebody uploaded.
  Therefore we need the ChannelId, which we can get by 2 ways.
  1. way: Ask the channel endpoint from the youtube API for the id of a username. Unfortunately not working most of the time, because the youtube channel must be very old to be found by username.
  2. way: Get the channelid by searching it in the sourcecode of a channel page. Either on your own or with a little script(not implemented yet).
  
  Now with the id we can send a request to the search endpoint from the youtube API and ask for the video data.
  After we got all the data, it's getting saved in a mongoDB database.
  


