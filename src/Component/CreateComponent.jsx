import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

export default function CreateComponent({ onCreate, type }) {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (boardName) {
      onCreate(boardName);
      setBoardName("");
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "rgba(131, 131, 131, 0.3)",
          },
          color: "white",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Create {type}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: "20px",
            borderRadius: "10px",
            width: "400px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Create New {type}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "20px" }}>
            To create a new {type}, please enter its name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="boardName"
            label={type + " Name"}
            type="text"
            fullWidth
            variant="standard"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            InputProps={{
              sx: {
                fontSize: "1rem",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              onClick={handleClose}
              sx={{
                color: "#1976d2",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                marginLeft: "10px",
              }}
            >
              Create
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
