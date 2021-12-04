import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import useFetchUser from './useFetchUser';
import {useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export default function AddPostButton() {
  const [open, setOpen] = useState(false);
  const {data}= useFetchUser('https://jsonplaceholder.typicode.com/users');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [uname, setUname] = useState('');

  const handleChange = (event) => {
    setUname(event.target.value);
  };

  return (
    <div>
        <Tooltip title="Add" placement="right-start">
      <Button variant="contained" onClick={handleClickOpen}>
        <b>ADD[+]</b>
      </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Post:-</DialogTitle>
        <DialogContent>
          <DialogContentText>
           It's always good to write, why not write a post.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
          />
    <InputLabel htmlFor="outlined-body-native-simple">Body</InputLabel>
          <TextareaAutosize
            aria-label="maximum height"
            maxRows={4}
            minRows={3}
            placeholder="Type here..."
            style={{ width: 500 }}
         /> 
  
    <InputLabel htmlFor="outlined-username-native-simple">Username</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={uname}
          onChange={handleChange}
       
        >
        <MenuItem value='' disabled>Select UserName</MenuItem>
         
        {data && data.map((usr)=>( 
          <MenuItem value= {usr.username} >{usr.username}</MenuItem>
            )
         )}

                  

  
    </Select>


        </DialogContent>
        <DialogActions>
          <Button variant ="contained" onClick={handleClose} color="error">Cancel</Button>
          <Button variant ="contained" onClick={handleClose} color="success" >Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


