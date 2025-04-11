import React from "react";
import ShakaPlayer from "../components/player/ShakaPlayer";
import HTML5Player from "../components/player/HTML5Player";

export default function Player() {
  const videoUrls = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://dash.akamaized.net/dash264/TestCasesUHD/2b/11/MultiRate.mpd",
    "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
  ];
  
  const url = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    const userAgent = navigator.userAgent;

  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    return <ShakaPlayer url={url} />;
  } else {
    return <HTML5Player url={url} />;
  }
}



  // const location = useLocation();
  // const url = location.state?.url 
