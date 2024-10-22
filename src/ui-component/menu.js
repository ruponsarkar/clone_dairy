import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function BasicMenu({menuItems}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


//   example menuItems -------------------------
//   const menuItems = (data) => [
//     {
//       name: "Change Active Status",
//       data: data,
//       onclick: ()=>handleStatus(data)
//     },
//     {
//       name: "Delete",
//       data: data,
//     //   onclick: ''
//     },
//   ];



  return (
    <div>

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon fontSize='small'/>
      </IconButton>



      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=> ''}>
              {menuItems}
            </MenuItem>


        {/* {menuItems && menuItems.map((m)=>(
            <MenuItem onClick={m.onclick && m.onclick}>
              {m.name}
            </MenuItem>
        ))} */}
      </Menu>
    </div>
  );
}
