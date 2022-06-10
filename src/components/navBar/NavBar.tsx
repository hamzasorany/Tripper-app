import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import Brand from "../../sharedComponents/Brand";
import useToggleEle from "../../customHooks/useToggleEle";
import UserInfo from "./UserInfo";
import Drawer from "./NavDrawr";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, handelOpen, handelClose] = useToggleEle();
  const activeLinkHandler = (path: string) => {
    return {
      color: pathname === path ? "var(--golden-color)" : "",
      border: pathname === path ? "1px solid var(--golden-color)" : "",
    };
  };
  return (
    <Box flexGrow={1} mb={5}>
      <AppBar
        sx={{ backgroundColor: "#fff", direction: "ltr" }}
        position="static"
      >
        <Toolbar>
          <IconButton
            onClick={handelOpen}
            color="primary"
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            open={open}
            toggleDrawer={handelOpen}
            closeDrawer={handelClose}
          />
          <Button
            variant="contained"
            sx={{ display: { xs: "none", md: "flex" } }}
            onClick={() => navigate("/signup")}
          >
            تسجيل الدخول
          </Button>
          {false && <UserInfo />}
          <Stack
            direction={"row"}
            justifyContent="center"
            alignItems={"center"}
            spacing={3}
            sx={{ m: "auto", display: { xs: "none", md: "flex" } }}
          >
            <Tooltip title="">
              <IconButton
                color="primary"
                sx={{
                  ...activeLinkHandler("/"),
                }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <IconButton color="primary">
                <LocationCityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <IconButton color="primary">
                <AirplanemodeActiveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <IconButton color="primary">
                <LocationOnIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <IconButton color="primary">
                <Inventory2Icon />
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <IconButton
                sx={{ ...activeLinkHandler("/favorite") }}
                color="primary"
                onClick={() => navigate("/favorite")}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Brand />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
