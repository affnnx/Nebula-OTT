import React, { useRef, useEffect, useState } from "react";
import {
    FaCompress,
  FaExpand,
  FaPause,
  FaPlay,
  FaStop,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

export default function HTML5Player({ url }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
 
  useEffect(() => {
    const video = videoRef.current;
    setIsPlaying(true);
    if (video) {
      video
        .requestFullscreen()
        .catch((err) => console.error("Fullscreen failed:", err));
    }
    const handleKeyDown = (event) => {
      if (!videoRef.current) return;

      switch (event.key) {
        case " ":
          event.preventDefault(); // Prevent page scrolling
          if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
          break;
        case "ArrowRight":
          videoRef.current.currentTime += 5; // Seek forward 5s
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 5; // Seek backward 5s
          break;
        case "m": // Mute/Unmute
          videoRef.current.muted = !videoRef.current.muted;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function togglePlayPause() {
    setIsPlaying((prev) => !prev);
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  function toggleMute() {
    if (videoRef.current) {
        if(isMute){
            videoRef.current.volume=1 
            setMute(false);
            setVolume(1)
        }
        else{
            videoRef.current.volume=0
            setMute(true);
            setVolume(0)

        }
    }
  }

  function   toggleScreenSize
  () {
    setFullScreen((prev) => !prev);
    if(!isFullScreen){
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
            /* Firefox */
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            /* IE/Edge */
            videoRef.current.msRequestFullscreen();
        }
    }
    else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }    }
  }

  document.addEventListener('fullscreenchange', () => {
    setFullScreen(!!document.fullscreenElement);
});

const handleVolumeChange=(e)=>{
   const newVol= e.target.value
   videoRef.current.volume=newVol
   setVolume(newVol)
   setMute(newVol==0)
    
}

const handleSeek=(event)=>{
    const seekTo = (event.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTo;
    setProgress(event.target.value);
}

const updateProgress = () => {
    if (videoRef.current) {
        const value =
            (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(value);
    }
};

setInterval(() => {
    updateProgress();
}, 1000); 

  return (
    <div>
    <button onClick={togglePlayPause}>
      <video ref={videoRef}>
        <source src={url} type="video/mp4" />
        <track 
        src="https://raw.githubusercontent.com/benwfreed/test-subtitles/master/mmvo72166981784.vtt" 
        kind="subtitles" 
        srcLang="en" 
        label="English"
        default 
      />
      </video>
    </button>
    <button onClick={togglePlayPause}>
    {isPlaying ? <FaPlay /> : <FaPause />}
  </button>
  <button onClick={toggleMute}>
    {isMute ? <FaVolumeMute /> : <FaVolumeUp />}
  </button>
  <button onClick={toggleScreenSize}>
    {isFullScreen ? <FaCompress /> : <FaExpand />}
  </button>
  <input type="range" min={0} max={1} step={0.05} onChange={handleVolumeChange} value={volume} />
  <input type="range" min={0} max={100} onChange={handleSeek} value={progress} />

</div>
  );
}
