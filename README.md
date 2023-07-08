# Youtube-HigherLower-API

script.js:
  The core idea is to get the videodata of the last 200 Videos somebody uploaded.
  Therefore we need the ChannelId, which we can get by 2 ways.
  1. way: Ask the channel endpoint from the youtube api for the id of a username. Unfortunately not working most of the time.
  2. way: Get the channelid by searching it in the hmtl of a channel page. Either on your own or with a little script.
  
  If the 1. way didn't work the 2. way is being used.
  
  Now with the id we can send a request to the search endpoint and ask for the video data.
  After we got all the data, it's getting saved in a mongoDB database.

API:
  The API has just 1 endpoint: "/getVidData". 
  First a random youtube channel from the db gets picked, then a random videoid by the channel.
  With the videoid the videos enpoint form the youtube API gets called. From the response we gonna take the channelname, the videoname, 
  the date it was published, the viewcount and the thumbnailURL. 
  
  


