import React, { useState } from "react";

import "../../styles/settings.css";
import { auth, functions } from "../../firebase/firebase";
import { useTogglePause } from "../../hooks/togglepause";
import { Switch, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { RequestName } from "../RequestName";

const Settings = () => {
  const DeleteDialog = () => {
    return (
      <Dialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
        }}
        aria-labelledby="Delete account confirmation"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)} color="white">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="warning" autoFocus>
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // ------------------------------------------------------------------------

  const [sharePaused, setSharePaused] = useTogglePause();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [requestDialog, setRequestDialog] = useState(false);
  const history = useHistory();
  const backToHome = () => {
    history.push("/");
  };

  const signOut = () => {
    auth.signOut();
  };

  const deleteAccount = async () => {
    try {
      const deleteFunction = functions.httpsCallable("deleteAccount");
      const customAuthToken = await deleteFunction({
        id: auth.currentUser.uid,
      });
      auth.signOut();
    } catch (err) {
      alert(
        "Deleting account failed. Try signing out and then signing back in again."
      );
    }
  };
  return (
    <div className="settings-window">
      <div className="settings-navbar">
        <FontAwesomeIcon size="lg" icon={faArrowLeft} onClick={backToHome} />
      </div>
      <div className="settings-header">Settings</div>
      <div className="settings-unit settings-toggle-pause-block">
        Pause Activity Sharing
        <Switch
          checked={sharePaused}
          onChange={() => setSharePaused(!sharePaused)}
        />
      </div>
      <RequestName />
      <div className="settings-unit settings-sign-out-container">
        <Button variant="outlined" color="white" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <div className="settings-unit settings-sign-out-container">
        <Button
          variant="outlined"
          color="white"
          onClick={() => setShowDeleteDialog(true)}
        >
          Delete Account
        </Button>
      </div>
      <DeleteDialog />
    </div>
  );
};

export { Settings };
