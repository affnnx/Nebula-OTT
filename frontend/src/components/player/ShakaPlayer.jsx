import React, { useRef, useEffect } from "react";
import shaka from "shaka-player";

export default function ShakaPlayer({ url }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const player = new shaka.Player(video);

    // Check if Shaka Player is supported
    if (shaka.Player.isBrowserSupported()) {
      player
        .load(url)
        .then(() => console.log("Video loaded successfully!"))
        .catch((error) => console.error("Error loading video:", error));
    } else {
      console.error("Shaka Player is not supported in this browser.");
    }

    if (video.requestFullscreen) {
      video.requestFullscreen().catch((err) => {
        console.log("Fullscreen failed:", err);
      });
    }

    const handleKeyDown = (event) => {
      if (!videoRef.current) return;

      switch (event.key) {
        case " ":
          event.preventDefault();
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
          break;
        case "ArrowRight":
          videoRef.current.currentTime += 10;
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 10;
          break;
        case "m":
          videoRef.current.muted = !videoRef.current.muted;
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return ()=>window.removeEventListener("keydown",handleKeyDown);
  }, []);

  return (
    <div>
      <video ref={videoRef} controls autoPlay />
    </div>
  );
}



















// useEffect(() => {
  //   async function initPlayer(){
  //   const video = videoRef.current;
  //   const player = new shaka.Player(video);
  
  //   // Check if Shaka Player is supported
  //   if (shaka.Player.isBrowserSupported()) {
  //     player
  //       .load(url)
  //       .then(() => console.log("Video loaded successfully!"))
  //       .catch((error) => console.error("Error loading video:", error));
  
  //     await player.addTextTrackAsync(
  //         "https://raw.githubusercontent.com/benwfreed/test-subtitles/master/mmvo72166981784.vtt",
  //         "en",     // Language Code
  //         "subtitle",  // Role (e.g., "subtitle", "caption")
  //         "text/vtt"   // MIME Type
  //       );
  //   } else {
  //     console.error("Shaka Player is not supported in this browser.");
  //   }
  
  //   if (video.requestFullscreen) {
  //     video.requestFullscreen().catch((err) => {
  //       console.log("Fullscreen failed:", err);
  //     });
  //   }
  
  //   const handleKeyDown = (event) => {
  //     if (!videoRef.current) return;
  
  //     switch (event.key) {
  //       case " ":
  //         event.preventDefault();
  //         if (videoRef.current.paused) {
  //           videoRef.current.play();
  //         } else {
  //           videoRef.current.pause();
  //         }
  //         break;
  //       case "ArrowRight":
  //         videoRef.current.currentTime += 10;
  //         break;
  //       case "ArrowLeft":
  //         videoRef.current.currentTime -= 10;
  //         break;
  //       case "m":
  //         videoRef.current.muted = !videoRef.current.muted;
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  
  //   return ()=>window.removeEventListener("keydown",handleKeyDown);
  // }
  // initPlayer()
  // }, []);