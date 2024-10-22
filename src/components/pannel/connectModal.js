import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';
import api from '../../API/api';

export default function ConnectModal() {
  const [open, setOpen] = React.useState(false);
  const [formdata, setFormdata] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    console.log(formdata);
    api.submitContactUs(formdata)
      .then((res) => {
        console.log(res);
        handleClose();
        Swal.fire({
          title: "Thank You",
          text: "Your Request Send Successfully ",
          icon: 'success',
        });
      })
      .catch((err) => {
        console.log(err.response);
      })

  }


  return (
    <React.Fragment>
      <div class="cust-btn" onClick={handleClickOpen}>
        Get In Touch
      </div>
      <Dialog
        fullWidth="true"
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Connect Me</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Fill Up The form
          </DialogContentText>
          <Box

          >

            <div className='row'>
              <div className="col-12">
                <div className="m-3">
                  <input type="text" name="name" value={formdata.name} onChange={handleInput} className='form-control' placeholder='Your Name' />
                  <input type="email" name='email' value={formdata.email} onChange={handleInput} className='form-control' placeholder='Emai Address' />
                  <input type="number" name='contact' value={formdata.contact} onChange={handleInput} className='form-control' placeholder='Your Contact Number' />

                  <textarea name="message" value={formdata.message} onChange={handleInput} className='form-control' id="" cols="10" rows="4" placeholder='Enter Your Message'></textarea>

                  <div className='text-center'>

                    <button className='btn btn-success btn-sm ' onClick={handleSubmit}>Send <SendIcon fontSize='sm' /> </button>
                  </div>


                </div>

              </div>



            </div>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
