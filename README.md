# Youtube-HigherLower-API
  This API is used by my "Youtube-HigherLower-FrontEnd" repository. The API takes a videoid from the database, which was filled by script.js and uses this id
  several data about the video from the youtube API.

### Live-Demo: https://youtube-higher-lower-api.vercel.app/getVidData
### Live-Demo with FrontEnd: https://youtube-higher-lower-frontend.vercel.app/
  
## Describtion for the script:
  The core idea is to get the videoId of the last 200 videos somebody uploaded.<br>
  Therefore we need the channelid, that a script gets by searching it in the html from a channelpage.<br>
  Now with the id we can send a request to the search endpoint from the youtube API and ask for the video data.<br>
  After we got all the data, it's getting saved in a mongoDB database.
  


