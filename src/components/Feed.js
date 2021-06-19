import React from "react";
import { useEffect, useState } from "react";
import { auth, analytics } from "../firebase/firebase";
import { useFollowList } from "../hooks/followlist";
import { useTogglePause } from "../hooks/togglepause";
import { firestore } from "../firebase/firebase";
import { PlayingCard } from "./PlayingCard";
import Switch from "@material-ui/core/Switch";
import "../styles/feed.css";

const Feed = () => {
  let cookieOn = localStorage.getItem("filterOn") === "true";
  const [dataList, setDataList] = useState(null);
  const [followList] = useFollowList(auth.currentUser.uid);
  const [filterByFollow, setFilterByFollow] = useState(cookieOn);
  const [sharePaused, setSharePaused] = useTogglePause();

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
        <div className="pause-sharing">
          Pause Sharing
          <Switch
            checked={sharePaused}
            onChange={() => {
              setSharePaused(!sharePaused);
              analytics.logEvent("toggle_share_pause");
            }}
            size="small"
          />
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
