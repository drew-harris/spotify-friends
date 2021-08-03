import React from "react";
import { useEffect } from "react";
import { analytics, auth } from "../../firebase/firebase";
import logo from "../../images/Spotify_Logo_RGB_White.png";
import { CODE_URI } from "../../constants";

const Login = () => {
  useEffect(() => {
    console.log(auth);
    localStorage.setItem("follows", JSON.stringify(["zzzzz"]));
  }, []);

  const redirect = () => {
    analytics.logEvent("sign_in_with_spotify");
    console.log("button clicked");
    window.location.replace(CODE_URI);
  };

  return (
    <div className="login-screen">
      <div className="login-box">
        <div className="spotify-friends-logo">
          Friends for
          <img className="spotify-logo" src={logo}></img>
        </div>
        <button className="spotify-button" onClick={redirect}>
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export { Login };
