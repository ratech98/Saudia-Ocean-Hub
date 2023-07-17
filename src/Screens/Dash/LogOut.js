import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LogOut = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Code to handle the logout functionality
    handleClose();
  };

  return (
    <div>
      <>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Logout
        </Button>
      </>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <div className={classes.modalContent}>
          <h2>Logout Confirmation</h2>
          <p>Are you sure you want to logout?</p>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LogOut;
