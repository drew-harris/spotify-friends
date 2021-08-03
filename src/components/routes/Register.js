import React from "react";
import { useEffect } from "react";
import { analytics, auth, functions } from "../../firebase/firebase";
import { useHistory, Redirect } from "react-router-dom";
import { REDIRECT_URI, BASE_AUTH_KEY } from "../../constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useAuth } from "../../hooks/auth";

const Register = (props) => {
  const user = useAuth();

  let history = useHistory();
  useEffect(() => {
    signUp();
  }, []);

  const signUp = async () => {
    const params = new URLSearchParams(props.location.search);
    const code = params.get("code");

    if (!code) {
      history.push("/login");
      return -1;
    }

    const [accessToken, refreshToken, error] = await getToken(code);
    if (!error) {
      const userInfo = await getProfile(accessToken);
      const customAuthToken = await fireSignUp(
        accessToken,
        refreshToken,
        userInfo
      );
      analytics.logEvent("sign_up");
      auth.signInWithCustomToken(customAuthToken);
    } else {
      alert(error.message);
    }
  };

  // Step 4 - sign up with external functions
  const fireSignUp = async (accessToken, refreshToken, userInfo) => {
    const signUpData = {
      profile: userInfo,
      accessToken,
      refreshToken,
    };
    const signUp = functions.httpsCallable("signUp");
    const customAuthToken = await signUp(signUpData);
    return customAuthToken.data.token;
  };

  //get Profile information
  const getProfile = async (accessToken, refreshToken) => {
    const url = "https://api.spotify.com/v1/me";
    const result = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    return result.data;
  };

  // Step 2 - get the tokens for the user
  const getToken = async (code) => {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    const url = "https://accounts.spotify.com/api/token";
    try {
      const result = await axios.post(url, params, {
        headers: {
          Authorization: BASE_AUTH_KEY,
        },
      });

      return [result.data.access_token, result.data.refresh_token, null];
    } catch (e) {
      /* handle error */
      console.error(e);
      alert(e.message);
      return [null, null, e];
    }
  };

  //----------------------------------------//

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-screen">
      <CircularProgress color="secondary" />
      <div className="login-box">Please don't refresh or leave this page</div>
    </div>
  );
};

export { Register };
