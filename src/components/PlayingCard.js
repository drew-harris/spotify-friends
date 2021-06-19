import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PreviewButton } from "./PreviewButton";
import {
  faPause,
  faPauseCircle,
  faPlus,
  faMinus,
  faUserPlus,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { firestore, auth, FieldValue, analytics } from "../firebase/firebase";
import { useFollowList } from "../hooks/followlist";

const SpotifyLinkButton = (props) => {
  return (
    <div
      onClick={() => {
        analytics.logEvent("open_in_spotify");
        window.location.replace(props.url);
      }}
      className=" preview-button-icon feed-card-action-button"
    >
      <FontAwesomeIcon className="fa-preview-icon" icon={faSpotify} />
    </div>
  );
};
const FollowingButton = (props) => {
  const [followList] = useFollowList(auth.currentUser.uid);
  const followUser = async () => {
    console.log("FOLLOWING USER");
    const myFollowsRef = firestore
      .collection("follows")
      .doc(auth.currentUser.uid);
    myFollowsRef.update({
      following: FieldValue.arrayUnion(props.username),
    });
    analytics.logEvent("follow_user");
  };
  const unfollowUser = async () => {
    console.log("UNFOLLOWING USER");
    const myFollowsRef = firestore
      .collection("follows")
      .doc(auth.currentUser.uid);
    myFollowsRef.update({
      following: FieldValue.arrayRemove(props.username),
    });
    analytics.logEvent("unfollow_user");
  };

  let followingIcon;
  if (followList.includes(props.username)) {
    followingIcon = (
      <FontAwesomeIcon
        className="feed-card-follow-button"
        onClick={unfollowUser}
        icon={faMinus}
        size="lg"
      />
    );
  } else {
    followingIcon = (
      <FontAwesomeIcon
        className="feed-card-follow-button"
        onClick={followUser}
        icon={faPlus}
        size="lg"
      />
    );
  }

  return followingIcon;
};

const PlayingCard = (props) => {
  const data = props.data;

  if (!data) {
    return null;
  }
  if (!data.playing) {
    return null;
  }

  let profilePic = null;
  if (data.profile.images.length > 0) {
    profilePic = (
      <img className="feed-card-profilepic" src={data.profile.images[0].url} />
    );
  }

  let albumShow;
  if (data.playing.name == data.playing.albumName) {
    albumShow = null;
  } else {
    albumShow = (
      <div className="feed-card-album-name">{data.playing.albumName}</div>
    );
  }

  return (
    <div className="feed-card">
      <div className="feed-card-left">
        <div className="feed-card-profile">
          <div className={"feed-card-username"}>
            {data.profile.display_name}
            {profilePic}
            {data.paused ? (
              <FontAwesomeIcon icon={faPauseCircle} size="lg" />
            ) : null}
          </div>
          <div className="follow-button-container">
            <FollowingButton username={data.profile.id} />
          </div>
        </div>
        <div className="feed-card-song-display">
          <div className="feed-card-album">
            <img
              src={data.playing.image}
              className="feed-card-album-art"
              alt="album art"
            />
          </div>
          <div className="feed-card-trackinfo">
            <div className="feed-card-song-name">{data.playing.name}</div>
            {albumShow}
            <div className="feed-card-artist-name">
              {data.playing.artistName}
            </div>
            <div className="feed-card-action-buttons">
              <SpotifyLinkButton url={data.playing.openUrl} />
              <PreviewButton url={data.playing.previewUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlayingCard };
