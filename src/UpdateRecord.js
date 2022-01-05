import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { UserData } from "./contexts/UserData";

import { useState, useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function UpdateRecord(props) {
  const { postId } = props;
  const [sopen, setSopen] = useState(false);
  const { data } = useContext(UserData);
  // here uname value is userId
  const [uname, setUname] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);

  const EditClick = () => {
    setOpen(true);
    fetch("https://jsonplaceholder.typicode.com/posts/" + postId)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
      });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  function Alert(props) {
    return <MuiAlert elevation={4} variant="filled" {...props} />;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSclose = () => {
    setSopen(false);
  };
  const handleChange = (event) => {
    setUname(event.target.value);
  };

  const handleClick = () => {
    setSopen(true);
  };

  const handleSubmit = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: uname,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        handleClick();
        setTitle("");
        setBody("");
        setUname("");
        setOpen(false);
      });
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          EditClick();
        }}
      >
        Edit
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Post:-</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the post for Post id</DialogContentText>

          <FormControl>
            <FormControl>
              <TextField
                margin="dense"
                id="name"
                label="Title"
                fullWidth
                variant="standard"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </FormControl>
            <FormControl>
              <br />
              <label id="label-textarea"> Body </label>
              <TextareaAutosize
                //labelId="label-textarea"
                aria-label="maximum height"
                maxRows={4}
                minRows={3}
                placeholder="Type Body here..."
                style={{ width: 500 }}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Select Username
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={uname}
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>Select UserName</em>
                </MenuItem>

                {data &&
                  data.map((usr) => (
                    <MenuItem value={usr.id} key={usr.id}>
                      {" "}
                      {usr.username}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={sopen} autoHideDuration={6000} onClose={handleSclose}>
        <Alert onClose={handleSclose} severity="success">
          Post Updated successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
