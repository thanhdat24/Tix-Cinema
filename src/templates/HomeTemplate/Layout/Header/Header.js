import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import useStyles from "./style";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory, useLocation } from "react-router-dom";

export default function Header(props) {
  const headMenu = [
    { nameLink: "Lịch chiếu", id: "lichchieu" },
    { nameLink: "Cụm rạp", id: "cumrap" },
    { nameLink: "Tin tức", id: "tintuc" },
    { nameLink: "Ứng dụng", id: "ungdung" },
  ];
  const { userLogin } = useSelector((state) => state.UserManagementReducer);
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles({ openDrawer });
  let location = useLocation();
  const handleLogin = () => {
    history.push("/login", location.pathname); // truyền kèm location.pathname để đăng nhập xong quay lại
  };
  const handleRegister = () => {
    history.push("/register", location.pathname);
  };
  return (
    <header className={classes.root}>
      {/* START HEADER */}
      <AppBar
        position="fixed"
        classes={{
          root: clsx(classes.appBar, { [classes.appBarShift]: openDrawer }),
        }}
        color="default"
      >
        <Toolbar className={classes.spaceBetween}>
          {/* logo */}
          <NavLink
            to="/"
            aria-label="Back to homepage"
            className={classes.logo}
          >
            <img
              src="./assets/img/web-logo.png"
              alt="logo"
              style={{ height: 50 }}
            />
          </NavLink>
          <div className={classes.linkTobody}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {headMenu.map((link) => (
                <span
                  key={link.id}
                  className={classes.link}
                  // onClick={() => handleClickLink(link.id)}
                >
                  {link.nameLink}
                </span>
              ))}
            </Grid>
          </div>

          {/* user account */}
          <div className={classes.user}>
            {userLogin ? (
              <List disablePadding className={classes.auth}>
                <ListItem
                  button
                  classes={{ root: clsx(classes.itemAuth, classes.divide) }}
                  // onClick={handleUser}
                >
                  <ListItemIcon classes={{ root: classes.icon }}>
                    <Avatar
                      alt="avatar"
                      className={classes.avatar}
                      src={`https://i.pravatar.cc/300?u=${userLogin.taiKhoan}`}
                    />
                  </ListItemIcon>
                  <ListItemText primary={userLogin?.hoTen} />
                </ListItem>
                <ListItem
                  button
                  classes={{ root: classes.itemAuth }}
                  onClick={userLogin}
                >
                  <ListItemText primary="Đăng Xuất" />
                </ListItem>
              </List>
            ) : (
              <List disablePadding className={classes.auth}>
                <ListItem
                  button
                  classes={{ root: clsx(classes.itemAuth, classes.divide) }}
                  onClick={handleLogin}
                >
                  <ListItemIcon classes={{ root: classes.icon }}>
                    <AccountCircleIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Đăng Nhập" />
                </ListItem>
                <ListItem
                  button
                  classes={{ root: classes.itemAuth }}
                  // onClick={handleRegister}
                >
                  <ListItemText primary="Đăng Ký" onClick={handleRegister} />
                </ListItem>
              </List>
            )}
          </div>
        </Toolbar>

        {/* <div className="items-center flex-shrink-0 hidden lg:flex">
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            Sign in
          </button>
          <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">
            Sign up
          </button>
        </div> */}
        {/* <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button> */}
      </AppBar>

      {/* content open menu*/}
      <Drawer
        className={classes.drawer}
        anchor="right"
        // onClose={handleDrawerClose}
        // open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        transitionDuration={300}
      >
        <div className={classes.drawerHeader}>
          {userLogin ? (
            <ListItem
              button
              classes={{
                root: clsx(classes.itemAuth, classes.divide, classes.hover),
              }}
              // onClick={handleUser}
            >
              <ListItemIcon classes={{ root: classes.icon }}>
                <Avatar
                  alt="avatar"
                  className={classes.avatar}
                  src={`https://i.pravatar.cc/300?u=${userLogin.taiKhoan}`}
                />
              </ListItemIcon>
              <ListItemText
                className={classes.username}
                primary={userLogin?.hoTen}
              />
            </ListItem>
          ) : (
            <ListItem
              button
              classes={{ root: classes.listItem }}
              // onClick={handleLogin}
            >
              <ListItemIcon classes={{ root: classes.icon }}>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              <span className={classes.link} style={{ fontWeight: 500 }}>
                Đăng Nhập
              </span>
            </ListItem>
          )}
          <IconButton
            classes={{ root: classes.listItem }}
            // onClick={handleDrawerClose}
          >
            {/* <ChevronRightIcon /> */}
          </IconButton>
        </div>
        <List>
          {headMenu.map((link) => (
            <span
              key={link.id}
              className={classes.itemMenu}
              // onClick={() => handleClickLink(link.id)}
            >
              {link.nameLink}
            </span>
          ))}

          {userLogin ? (
            <span className={classes.itemMenu}>Đăng Xuất</span>
          ) : (
            <span className={classes.itemMenu}>Đăng Ký</span>
          )}
        </List>
      </Drawer>
    </header>
  );
}
