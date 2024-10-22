import React, {useState, useEffect} from 'react'
import Menu from '@mui/icons-material/Menu';
import { MenuItem, Button } from '@mui/material';
export default function Test(){
    const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState()

  const recordButtonPosition = (event) => {
      setAnchorEl(event.currentTarget);
      setMenuOpen(true);
  }

  let closeMenu = () => {
      setMenuOpen(false);
  }
    return(
        <>
         <React.Fragment>
          <Button onClick={recordButtonPosition}>
              OPEN MENU
          </Button>
          <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={closeMenu}>
              <MenuItem onClick={closeMenu}> ExampleMenuItem </MenuItem> 
          </Menu>
      </React.Fragment>
        
        </>
    )
}