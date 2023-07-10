# Youtube-HigherLower-API
  This API is used by my "Youtube-HigherLower-FrontEnd" repository. The API takes a random videoid from the database, which 
  was filled by script.js and uses this id to get several data about the video from the youtube API.

### Live-Demo: https://youtube-higher-lower-api.vercel.app/getVidData
![image](https://github.com/anddyyyy46/Youtube-HigherLower-API/assets/132681533/1d0e1170-875d-42d1-82bb-155083a97726)
### Live-Demo with FrontEnd: https://youtube-higher-lower-frontend.vercel.app/
![image](https://github.com/anddyyyy46/Youtube-HigherLower-API/assets/132681533/82ddb860-0b2d-499c-ae7d-b39b9db2f105)

  
## Describtion for the script:
  The core idea is to get the videoId of the last 200 videos somebody uploaded.<br>
  Therefore we need the channelid, that a script gets by searching it in the html from a channelpage.<br>
  Now with the id we can send a request to the search endpoint from the youtube API and ask for the video data.<br>
  After we got all the data, it's getting saved in a MongoDB database.
## Installation:
```
git clone url
npm install
```
to run the API:
```
cd api
node index.js
```
to run the script:
```
node script.js
```
  
  


