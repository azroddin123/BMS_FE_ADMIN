import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CollectionsIcon from '@mui/icons-material/Collections';
import InfoIcon from "@mui/icons-material/Info";
import BrushIcon from '@mui/icons-material/Brush';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { Link, useLocation } from "react-router-dom";
import TranslateIcon from '@mui/icons-material/Translate';
import { Store } from "@mui/icons-material";
import StorageIcon from '@mui/icons-material/Storage';

const NavList = ({ open }) => {
  const theme = useTheme();
  const location = useLocation();
  const NAVLIST_DATA = [
    { id: 1, link: "/", name: "Dashboard", icon: <DashboardIcon /> },
    { id: 2, link: "/makeup-artists", name: "Makeup Artists", icon: <BrushIcon /> },
    { id: 2, link: "/parlours", name: "Parlours", icon: <Store /> },
    // { id: 2, link: "/gallery", name: "Gallery", icon: <CollectionsIcon /> },
    { id: 3, link: "/banners", name: "Banners", icon: <ViewCarouselIcon /> },
    { id: 4, link: "/testimonials", name: "Testimonials", icon: <FormatQuoteIcon /> },
    { id: 4, link: "/storage-management", name: "Storage", icon: <StorageIcon /> },
    // { id: 7, link: "/makeup-products", name: "Makeup Products", icon: <LocalMallIcon /> },
    { id: 7, link: "/meta-tags", name: "Meta Tags", icon: <TranslateIcon /> },
    // { id: 5, link: "/about", name: "About", icon: <InfoIcon /> },
    { id: 6, link: null, name: "Logout", icon: <LogoutIcon />,onClick : ()=>{localStorage.removeItem("_token");window.location.reload();} },
  ];
  
  return (
    <List>
      {NAVLIST_DATA.map(({ name, id, icon, link ,onClick = ()=>{}}, index) => (
        <ListItem key={index} disablePadding sx={{ display: "block" }}
        onClick = {onClick}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            component={Link}
            to={link || "/"}  
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "0px",
                justifyContent: "center",
                transition: "0.4s",
                color : location.pathname == link && theme.palette.primary.main 
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={name}
              sx={{ transition: "0.4s", opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
