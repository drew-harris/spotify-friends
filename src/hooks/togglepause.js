import { useState, useEffect } from "react";
import { firestore, auth, analytics } from "../firebase/firebase";

const useTogglePause = () => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    var unsubscribe = firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        var newData = doc.data();
        setIsPaused(newData.paused);
      });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const setPaused = async (status) => {
    analytics.logEvent("toggle_pause");
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);
    userRef.update({
      paused: status,
    });
  };
  return [isPaused, setPaused];
};

export { useTogglePause };
