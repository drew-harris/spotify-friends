import React from "react";
import { useEffect, useState } from "react";
import { auth, analytics } from "../firebase/firebase";
import { useFollowList } from "../hooks/followlist";
import { firestore } from "../firebase/firebase";
import { PlayingCard } from "./PlayingCard";
import Switch from "@material-ui/core/Switch";
import "../styles/feed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Feed = () => {
  let cookieOn = localStorage.getItem("filterOn") === "true";
  const [dataList, setDataList] = useState(null);
  const [followList] = useFollowList(auth.currentUser.uid);
  const [filterByFollow, setFilterByFollow] = useState(cookieOn);
  const history = useHistory();

  const goToSettings = () => {
    history.push("/settings");
  };

  const goToPeople = () => {
    history.push("/find");
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .orderBy("playing.updated", "desc")
      .onSnapshot((querySnapshot) => {
        let documents = querySnapshot.docs.map((doc) => doc.data());
        if (filterByFollow) {
          documents = documents.filter((doc) =>
            followList.includes(doc.profile.id)
          );
        }
        setDataList(documents);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, [filterByFollow]);

  if (!dataList) {
    return null;
  }

  const cards = dataList.map((data) => {
    return <PlayingCard data={data} key={data.profile.id} />;
  });

  return (
    <div className="feed-window">
      <div className="feed-controls">
        <div className="feed-links">
          <div className="feed-link-icon" onClick={goToSettings}>
            <FontAwesomeIcon
              size="lg"
              className="feed-settings-icon"
              icon={faCog}
            />
          </div>
          <div className="feed-link-icon" onClick={goToPeople}>
            <FontAwesomeIcon
              size="lg"
              className="feed-settings-icon"
              icon={faUserPlus}
            />
          </div>
        </div>
        <div className="filter-by-following">
          Filter Following
          <Switch
            checked={filterByFollow}
            onChange={() => {
              localStorage.setItem("filterOn", (!filterByFollow).toString());
              setFilterByFollow(!filterByFollow);
              analytics.logEvent("change_filter");
            }}
            size="small"
          />
        </div>
      </div>
      <div className="feed-cards-wrapper">{cards}</div>
    </div>
  );
};

export { Feed };
