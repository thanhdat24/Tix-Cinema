import {
  AppBar,
  Toolbar,
  Box,
  Hidden,
  Badge,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";

const TopBar = ({ onMobileNavOpen, ...rest }) => {
  //   const [notifications] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickLogo = () => {
    // dispatch({ type: LOADING_BACKTO_HOME });
    setTimeout(() => {
      history.push("/", "");
    }, 50);
  }; // style constant

  return (
    <AppBar elevation={0} position="static" {...rest}>
      <Toolbar>
        <div onClick={handleClickLogo} style={{ cursor: "pointer" }}>
          <img
            src="/assets/img/headTixLogo.png"
            alt="logo"
            style={{ height: 50 }}
          />
        </div>
        {/* 1 thẻ div chiếm hết khoảng trống còn lại dể dồn các icon về 2 bên */}
        <Box flexGrow={1} />

        {/* icon chuông và đăng xuất */}
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              //   badgeContent={notifications.length}
              color="error"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Đăng xuất">
            <IconButton
              color="inherit"
              //   onClick={() => dispatch({ type: LOGOUT })}
            >
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>

        {/* icon menu */}
        <Hidden lgUp>
          <IconButton
            color="inherit"
            // nếu click thì thực hiện func đóng mở Nav được truyền vào từ cha
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

// báo lỗi nếu kiểu dữ liệu truyền vào props không đúng với yều cầu bên dưới
TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};
export default TopBar;
