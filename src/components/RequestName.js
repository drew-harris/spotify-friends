import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import { firestore, auth } from "../firebase/firebase";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  input: {
    color: "white",
    borderColor: "white",
  },
});

const RequestName = () => {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState("");
  const sendRequest = async () => {
    try {
      firestore.collection("username_requests").add({
        from: auth.currentUser.uid,
        to: formValue,
      });
      setFormValue("");
      setOpen(false);
    } catch (err) {
      alert("There was an error submiting a username request");
    }
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="settings-unit settings-sign-out-container">
        <Button variant="outlined" color="white" onClick={() => setOpen(true)}>
          Request New Username
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Username Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New username requests may take a while to process. Please be
            patient.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Username"
            type="email"
            InputProps={{
              className: classes.input,
            }}
            className={classes.root}
            fullWidth
            value={formValue}
            onChange={(event) => setFormValue(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="white">
            Cancel
          </Button>
          <Button onClick={sendRequest} color="white">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export { RequestName };
