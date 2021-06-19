import { auth } from "../firebase/firebase";
import { useState, useEffect } from "react";

const useAuth = (props) => {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    let changer = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      console.log("CLEANUP RAN");
      changer = undefined;
    };
  }, []);

  return user;
};

export { useAuth };
