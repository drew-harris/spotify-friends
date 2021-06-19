import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase";

const useFollowList = (username) => {
  var localNames = JSON.parse(localStorage.getItem("follows"));
  const [followList, setFollowList] = useState(localNames);

  useEffect(() => {
    var unsubscribe = firestore
      .collection("follows")
      .doc(username)
      .onSnapshot((doc) => {
        var newData = doc.data();
        setFollowList(newData.following);
        localStorage.setItem("follows", JSON.stringify(newData.following));
      });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return [followList];
};

export { useFollowList };
