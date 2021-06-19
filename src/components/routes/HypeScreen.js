import React from "react";
import { useEffect } from "react";
import { analytics } from "../../firebase/firebase";
import logo from "../../images/Spotify_Logo_RGB_White.png";

const HypeScreen = () => {
  const redirect = () => {
    console.log("button clicked");
  };
  useEffect(() => {
    analytics.logEvent("open_hype_screen");
  }, []);

  return (
    <div className="login-screen">
      <div className="login-box">
        <div className="spotify-friends-logo">
          Friends for
          <img className="spotify-logo" src={logo}></img>
        </div>
      </div>
    </div>
  );
};

export { HypeScreen };
