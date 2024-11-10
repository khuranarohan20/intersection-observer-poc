import React, { useEffect, useRef, useState } from "react";
import { imageSource, videoSource } from "../source";

const VideoPlayer = () => {
  const [visibleVideos, setVisibleVideos] = useState(new Set());

  const videoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;

          if (entry.intersectionRatio >= 0.6) {
            setVisibleVideos((prev) => new Set(prev).add(index));
          } else {
            setVisibleVideos((prev) => {
              const updated = new Set(prev);
              updated.delete(index);
              return updated;
            });
          }
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="h-100 w-100 d-flex flex-column gap-5">
      {Array.from({ length: 2_000 }, (_, i) => (
        <VideoElement
          key={i}
          index={i}
          visible={visibleVideos.has(i.toString())}
          ref={(el) => (videoRefs.current[i] = el)}
        />
      ))}
    </div>
  );
};

const VideoElement = React.forwardRef(({ index, visible }, ref) => {
  const [videoSourceLoaded, setVideoSourceLoaded] = useState(false);

  useEffect(() => {
    if (visible) {
      setVideoSourceLoaded(true);
    } else {
      setVideoSourceLoaded(false);
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      data-index={index}
      style={{ height: "80vh", width: "100%", backgroundColor: "#000" }}
    >
      {visible && videoSourceLoaded ? (
        <video
          src={videoSource}
          poster={imageSource}
          controls
          muted
          autoPlay
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <img src={imageSource} className="h-100 w-100" />
      )}
    </div>
  );
});

export default VideoPlayer;
