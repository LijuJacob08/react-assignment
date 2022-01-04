import * as React from "react";
import Button from "@mui/material/Button";
//import Button from '@material-ui/core/Button';
//import { useEffect } from 'react';
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
//import Tooltip from '@mui/material/Tooltip';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
//import useFetchUser from './useFetchUser';
import { UserData } from "./contexts/UserData";

import { useState, useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//import { Alert } from '@mui/material';

export default function UpdateRecord(prop) {
  const postId = prop.postId;
  //console.log(postId);
  const [postData, setPostData] = useState("");
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  //data from the postlist
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + postId)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((pdata) => {
        //   if (data && Object.keys(data).length !== 0){
        // pdata.map((post)=>{
        //   //  if (data && Object.keys(data).length !== 0){
        //     data.map((udata)=>{
        //     if (post.userId===udata.id)
        //     { post.userId = udata.username;}
        //     //console.log(post);
        //     })
        //     //console.log(post);
        //     return post;

        // })
        //    }
        //return post;
        //console.log(pdata);
        setTitle(pdata.title);
        setBody(pdata.body);
        //setUsername(pdata.username);
        //setId(pdata.id);
        //setPostData(pdata);

        setError(null);
        setIsPending(false);
        //}
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [postId]);

  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  }

  //data from the postlist
  const [sopen, setSopen] = useState(false);
  const { data } = useContext(UserData);
  //console.log(postData);
  // here uname value is userId
  const [uname, setUname] = useState("");
  const [title, setTitle] = useState(postData.title);
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  //const {data}= useFetchUser('https://jsonplaceholder.typicode.com/users');

  console.log(title);
  function Alert(props) {
    return <MuiAlert elevation={4} variant="filled" {...props} />;
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

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
    //const newpost={title,body,uname}
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "PUT",
      body: JSON.stringify({
        title: { title },
        body: { body },
        userId: { uname },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        handleClick();
        setTitle("");
        setBody("");
        setUname("");
      });
  };

  return (
    <div>
      {/* <Tooltip title="Add" placement="right-start">
      <Button variant="contained" onClick={handleClickOpen}>
        <b>ADD[+]</b>
      </Button> 
      </Tooltip> */}
      {/* <form  onSubmit={handleSubmit} autoComplete="off"> */}
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
      {/* </form> */}
    </div>
  );
}
