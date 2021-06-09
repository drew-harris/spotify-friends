import React from "react";
import { useEffect } from "react";
import { auth } from "../../firebase/firebase";

const Login = () => {
  useEffect(() => {
    console.log(auth);
  }, []);

  const redirect = () => {
    console.log("button clicked");
  };

  return (
    <div className="login-screen">
      <div className="login-box">
        <div className="spotify-friends-logo">
          Spotify With Friends
        </div>
        <button id="login-with-spotify-button" onClick={redirect}>Login with Spotify</button>
      </div>
    </div>
  )
}

export { Login };
