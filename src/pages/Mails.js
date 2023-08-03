import React, { useState, useEffect } from "react";
import MailCard from "../Components/MailCard";
import { Box, Snackbar, Alert } from "@mui/material";

function Mails() {
  const [mails, setMails] = useState(null);
  const [message, setMessage] = useState({ message: null, severity: null });
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    (async () => {
      await fetch("http://192.168.18.5:9091/mwe/incoming")
        .then((val) => {
          setMails(val.body);
        })
        .catch((err) => {
          setMessage({ message: err, severity: "error" });
          handleClick();
        });
    })();
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    return (
      <Box>
       
        <MailCard />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  };
}

export default Mails;
