const axios = require("axios").default;

let channelName = "MadSeasonShow",
  channelId = "",
  videos = [];
console.log("1");

const sendGetRequest = async () => {
    try {
      const resp = await axios.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
          params: {
            part: "contentDetails",
            forUsername: channelName,
            key: "AIzaSyBIA7QF-efQx4Hl-3EPrj72uquQI9yDXvM",
          },
        }
      );
      channelId = resp.data.items[0].contentDetails.relatedPlaylists.uploads;
      getVideos(channelId);
    } catch (err) {
      // Handle Error Here
      console.error("hata 1");
    }
  },
  getVideos = async (channelId, nextPageToken = "") => {
    try {
      const resp = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            maxResults: 50,
            playlistId: channelId,
            key: "AIzaSyBIA7QF-efQx4Hl-3EPrj72uquQI9yDXvM",
            pageToken: nextPageToken,
          },
        }
      );
      resp.data.items.forEach((item) => {
        videos.push(item.snippet.title);
      });
      if (resp.data.nextPageToken && videos.length <= 300) {
        getVideos(channelId, resp.data.nextPageToken);
      } else {
        console.log(videos);
      }
    } catch (err) {
      console.log("hata 2");
    }
  };

sendGetRequest();
