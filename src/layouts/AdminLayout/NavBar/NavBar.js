import {
  Drawer,
  Hidden,
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  makeStyles,
} from "@material-ui/core";

import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip";

import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import MovieIcon from "@material-ui/icons/Movie";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PostAddIcon from "@material-ui/icons/PostAdd";
import NavItem from "./NavItem";
const items = [
  {
    href: "/admin/movies",
    icon: MovieIcon,
    title: "Quản lý Phim",
  },
  {
    href: "/admin/users",
    icon: PeopleAltIcon,
    title: "Quản lý người dùng",
  },
  {
    href: "/admin/showtimes",
    icon: PostAddIcon,
    title: "Tạo lịch chiếu",
  },
];
const useStyles = makeStyles(() => ({
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));
export default function NavBar() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { userLogin } = useSelector((state) => state.UserManagementReducer);

  const user = {
    avatar: `https://i.pravatar.cc/300?u=${userLogin.taiKhoan}`,
    jobTitle: "Senior Developer",
    name: userLogin?.hoTen,
  };
  const handleUser = () => {
    history.push("/login");
  };

  const content = (
    // cái này là div để dàn thành cột
    <Box height="100%" display="flex" flexDirection="column">
      {/* đây là phần logo avatar user và tên user */}

      <Box
        // căn giữa cột
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2} // padding 2
      >
        <Tooltip title="Thông tin tài khoản">
          <Avatar
            className={classes.avatar}
            src={user.avatar}
            onClick={handleUser}
          />
        </Tooltip>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />

      {/* đây là phần menu lựa chọn */}
      <Box p={2}>
        <List>
          {items.map((item) => (
            // NavItem hiện thị ra icon và title
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
  return (
    <>
      {/* đây là giao diện desktop */}
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open //   open // luôn luôn hiện Drawer
          variant="persistent" // kiểu persistent không có lớp phủ mờ khi hiện drawer
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}
NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};
