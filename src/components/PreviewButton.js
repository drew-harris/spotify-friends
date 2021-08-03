import React from "react";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { analytics } from "../firebase/firebase";

const PreviewButton = (props) => {
  const audioTag = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlaying = () => {
    if (isPlaying) {
      audioTag.current.pause();
      setIsPlaying(false);
    } else {
      analytics.logEvent("play_preview");
      audioTag.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <React.Fragment>
      <div
        className="preview-button-icon feed-card-action-button"
        onClick={togglePlaying}
      >
        {isPlaying ? (
          <FontAwesomeIcon className="fa-preview-icon" icon={faPause} />
        ) : (
          <FontAwesomeIcon className="fa-preview-icon" icon={faPlay} />
        )}
      </div>
      <audio ref={audioTag} src={props.url} />
    </React.Fragment>
  );
};
export { PreviewButton };
