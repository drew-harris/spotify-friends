const REDIRECT_URI = "https://friends-for-spotify.web.app/register";
//const REDIRECT_URI = "http://localhost:3000/register";

const CODE_URI = createCodeUri(REDIRECT_URI);

function createCodeUri(redirectUri) {
  var params = new URLSearchParams();
  params.append("client_id", "5b940c8bf0104d1099da47063cadfe80");
  params.append("response_type", "code");
  params.append("redirect_uri", redirectUri);
  params.append(
    "scope",
    "user-read-currently-playing user-follow-read user-read-recently-played"
  );
  console.log(params.toString());
  return "https://accounts.spotify.com/authorize?" + params.toString();
}

const BASE_AUTH_KEY =
  "Basic NWI5NDBjOGJmMDEwNGQxMDk5ZGE0NzA2M2NhZGZlODA6NWQzZmI2YzJmMDE5NDRhOGIyMTk2ZDhmNDhiOTBhZWE=";

const APP_ENABLED = true;
const SHOW_INSTALL_POPUP = true;
export {
  CODE_URI,
  REDIRECT_URI,
  BASE_AUTH_KEY,
  APP_ENABLED,
  SHOW_INSTALL_POPUP,
};
