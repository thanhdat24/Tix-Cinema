import { Tabs } from "antd";
import Step from "@mui/material/Step";
import SeatIcon from "@material-ui/icons/CallToActionRounded";
import PaymentIcon from "@material-ui/icons/Payment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import clsx from "clsx";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../App";
import { CHANGE_STATUS_ACTIVE } from "../../../redux/actions/types/BookingTicketManagementType";
import { useStyles, ColorlibConnector } from "./style";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

import { styled } from "@mui/material/styles";
export default function StepCheckout(props) {
  const { TabPane } = Tabs;
  const { statusActive } = useSelector(
    (state) => state.BookingTicketManagementReducer
  );

  const { userLogin } = useSelector((state) => state.UserManagementReducer);
  const dispatch = useDispatch();
  const steps = ["CHỌN GHẾ", "THANH TOÁN", "KẾT QUẢ ĐẶT VÉ"];
  const classes = useStyles();
  function StepIcon(props) {
    const { active, completed } = props;
    const icons = {
      1: <SeatIcon />,
      2: <PaymentIcon />,
      3: <CheckCircleIcon />,
    };
    return (
      <div
        className={clsx(classes.stepIcon, {
          [classes.stepIconActive]: active,
          [classes.stepIconCompleted]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  const handleUser = () => {
    history.push("/profile");
  };
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={statusActive}
        className={classes.stepper}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{ label: classes.label }}
              StepIconComponent={StepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.account} onClick={handleUser}>
        <img
          className={classes.avatar}
          src={`https://i.pravatar.cc/300?u=${userLogin.taiKhoan}`}
          alt="avatar"
        />
        <p className={classes.hoTen}>{userLogin.hoTen}</p>
      </div>
    </div>
  );
}
// ColorlibConnector: đường gạch ngang nối giữa các bước
// activeStep: xác định step hiện tại
// StepIconComponent: node làm icon đại diện, mặc định nhận vào boolean active, completed, error và number: icon để css tương ứng
