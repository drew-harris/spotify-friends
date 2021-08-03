import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { FollowCard } from "./FollowCard";
import { useHistory } from "react-router";
import "../styles/findpeople.css";

const FindPeople = () => {
  const [dataList, setDataList] = useState(null);
  const history = useHistory();
  const backToHome = () => {
    history.push("/");
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .onSnapshot((querySnapshot) => {
        let documents = querySnapshot.docs.map((doc) => doc.data());
        setDataList(documents);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  if (!dataList) {
    return null;
  }

  const cards = dataList.map((data) => {
    return <FollowCard data={data} key={data.profile.id} />;
  });

  return (
    <div className="find-people-window">
      <div className="findpeople-navbar">
        <FontAwesomeIcon size="lg" icon={faArrowLeft} onClick={backToHome} />
      </div>
      <div className="follow-cards-container">{cards}</div>
    </div>
  );
};

export { FindPeople };
