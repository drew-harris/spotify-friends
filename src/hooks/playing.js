import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase";

const usePlaying = (name) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    var unsubscribe = firestore
      .collection("users")
      .doc(name)
      .onSnapshot((doc) => {
        var newData = doc.data();
        setData(newData);
      });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return [data];
};

export { usePlaying };
