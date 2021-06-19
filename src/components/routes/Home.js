import React from "react";
import { useEffect, useState } from "react";
import { auth, analytics } from "../../firebase/firebase";
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { APP_ENABLED } from "../../constants";
import { Feed } from "../Feed";
import { FindPeople } from "../FindPeople";
import { HypeScreen } from "./HypeScreen";
import { InstallPopup } from "../InstallPopup";

const Home = () => {
  const user = useAuth();
  let history = useHistory();
  const [showInstallPopup, setShowInstallPopup] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
    if (window.matchMedia("(display-mode: standalone)").matches) {
      analytics.setUserProperties({ using_pwa: true });
    } else {
      analytics.setUserProperties({ using_pwa: false });
      setShowInstallPopup(true);
    }
    analytics.logEvent("open_app");
  }, []);
  const logOut = () => {
    auth.signOut();
  };
  if (!APP_ENABLED) {
    return <HypeScreen />;
  }

  if (!user) {
    return null;
  } else {
    analytics.setUserId(auth.currentUser.uid);
    return (
      <React.Fragment>
        {showInstallPopup ? <InstallPopup /> : null}
        <Router>
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/feed" component={Feed} />
            <Route path="/find" component={FindPeople} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
};

export { Home };
