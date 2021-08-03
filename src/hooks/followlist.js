import { useState, useEffect } from "react";
import { firestore, auth } from "../firebase/firebase";

const useFollowList = () => {
  var localNames = JSON.parse(localStorage.getItem("follows"));
  const [followList, setFollowList] = useState(localNames);

  useEffect(() => {
    var unsubscribe = firestore
      .collection("follows")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        var newData = doc.data();
        if (newData) {
          setFollowList(newData.following);
          localStorage.setItem("follows", JSON.stringify(newData.following));
        }
      });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return [followList];
};

export { useFollowList };
