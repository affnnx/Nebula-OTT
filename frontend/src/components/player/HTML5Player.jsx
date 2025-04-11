import React, { useEffect, useRef } from "react";

export default function HTML5Player({ url }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => console.warn("Autoplay error:", err));
      video.requestFullscreen?.().catch((err) => console.warn("Fullscreen error:", err));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      controls
      autoPlay
      style={{ width: "100%", maxWidth: "800px" }}
    >
      <track
        src="https://raw.githubusercontent.com/benwfreed/test-subtitles/master/mmvo72166981784.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
        default
      />
    </video>
  );
}
