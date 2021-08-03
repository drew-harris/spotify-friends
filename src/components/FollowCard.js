import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPauseCircle,
  faPlus,
  faMinus,
  faUserPlus,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { firestore, auth, FieldValue, analytics } from "../firebase/firebase";
import { useFollowList } from "../hooks/followlist";

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
        className="follow-card-follow-button"
        onClick={unfollowUser}
        icon={faMinus}
        size="lg"
      />
    );
  } else {
    followingIcon = (
      <FontAwesomeIcon
        className="follow-card-follow-button"
        onClick={followUser}
        icon={faPlus}
        size="lg"
      />
    );
  }

  return followingIcon;
};

const FollowCard = (props) => {
  const data = props.data;
  const openProfile = () => {
    window.location.replace(data.profile.external_urls.spotify);
  };

  if (!data) {
    return null;
  }
  if (!data.playing) {
    return null;
  }

  let profilePic = null;
  if (data.profile.images.length > 0) {
    profilePic = (
      <img
        className="follow-card-profilepic"
        src={data.profile.images[0].url}
      />
    );
  }

  return (
    <div className="feed-card">
      <div className="feed-card-left">
        <div className="feed-card-profile">
          <div className={"feed-card-username"} onClick={openProfile}>
            {profilePic}
            {data.profile.display_name}
          </div>
          <div className="follow-button-container">
            <FollowingButton username={data.profile.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { FollowCard };
