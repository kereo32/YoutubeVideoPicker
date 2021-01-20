import axios from "axios";
import "regenerator-runtime/runtime";

let channelName = "MadSeasonShow",
  channelId = "",
  videos = [];

const textArea = document.getElementById("channelName"),
  videoContainer = document.getElementById("videoContainer"),
  video = document.getElementById("video"),
  button = document.getElementById("submitButton");

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
      return channelId;
    } catch (err) {
      // Handle Error Here
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
        videos.push(item.snippet.resourceId.videoId);
      });
      if (resp.data.nextPageToken && videos.length <= 300) {
        await getVideos(channelId, resp.data.nextPageToken);
      } else {
        showResult();
      }
    } catch (err) {}
  },
  pickRandomVideo = () => {
    let randomVideo = videos[Math.floor(Math.random() * videos.length)];
    return randomVideo;
  },
  showResult = () => {
    let videoId = pickRandomVideo();
    videoContainer.style.visibility = "visible";
    video.src = "https://www.youtube.com/embed/" + videoId;
  },
  main = async () => {
    getVideos(await sendGetRequest());
  };
button.addEventListener("click", async () => {
  if (textArea.value == "" || textArea.value == null) {
    alert("Please enter a channel name");
  } else {
    if (textArea.value != channelName) {
      videos = [];
      channelName = textArea.value;
      getVideos(await sendGetRequest());
    } else {
      showResult();
    }
  }
});
main();
