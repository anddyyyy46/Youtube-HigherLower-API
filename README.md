# Youtube-HigherLower-API
  This API is used by my "Youtube-HigherLower-FrontEnd" repository. The API takes a videoid from the database, which was filled by script.js and uses this id
  several data about the video from the youtube API.

  
## Describtion for the script:
  The core idea is to get the videoId of the last 200 Videos somebody uploaded.
  Therefore we need the ChannelId, which we can get by 2 ways.
  1. way: Ask the channel endpoint from the youtube api for the id of a username. Unfortunately not working most of the time.
  2. way: Get the channelid by searching it in the hmtl of a channel page. Either on your own or with a little script.
  
  Now with the id we can send a request to the search endpoint and ask for the video data.
  After we got all the data, it's getting saved in a mongoDB database.
  


