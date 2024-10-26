import React, { useState } from "react";
import Disk from "../Assets/Disk.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link } from 'react-router-dom'
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    { text: "Home" },
    { text: "About" },
    { text: "Testimonials" },
    { text: "Contact" },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Disk} alt="Disk logo" style={{ height: "70px", width: "70px" }} />
        <h1 className="primary-heading">Disc</h1>
      </div>

      <div className="navbar-links-container">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Testimonials</a>
        <a href="#">Contact</a>
        <Link className="primary-button" to='/login'>Login / Sign Up</Link>
      </div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      {/* <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer> */}
    </nav>
  );
};

export default Navbar;
