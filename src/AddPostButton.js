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

export default function AddPostButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Tooltip title="Add" placement="right-start">
      <Button variant="contained" onClick={handleClickOpen}>
        <b>+</b>
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
              <TextareaAutosize
      aria-label="maximum height"
      maxRows={4}
      minRows={3}
      placeholder="Enter the Body Here"
      style={{ width: 500 }}
    />

        </DialogContent>
        <DialogActions>
          <Button variant ="contained" onClick={handleClose} color="error">Cancel</Button>
          <Button variant ="contained" onClick={handleClose} color="success" >Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


