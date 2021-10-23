import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";

import { useStyles, materialTheme } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getMovieListManagement } from "../../redux/actions/FilmManagementAction";
import {
  createShowtime,
  resetCreateShowtime,
} from "../../redux/actions/BookingTicketManagementAction";
import theatersApi from "../../api/theatersApi";
import { useSnackbar } from "notistack";

export default function CreateShowtime() {
  const { enqueueSnackbar } = useSnackbar();

  let { arrFilmDefault } = useSelector((state) => state.FilmManagementReducer);
  const { loadingCreateShowtime, successCreateShowtime, errorCreateShowtime } =
    useSelector((state) => state.BookingTicketManagementReducer);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({
    setPhim: "",
    heThongRapRender: [],

    setHeThongRap: "",
    cumRapRender: [],

    setCumRap: "",
    rapRender: [],

    setRap: "",
    maCumRap: "",

    ngayChieuGioChieu: null,

    setGiaVe: "",
    giaVeRender: [75000, 100000, 120000, 150000],
  });

  const [isReadyTaoLichChieu, setIsReadyTaoLichChieu] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (arrFilmDefault) {
      dispatch(getMovieListManagement());
    }
  }, []);
  console.log("data.setPhim", data.setPhim);
  console.log("data.ngayChieuGioChieu", data.ngayChieuGioChieu);
  console.log("data.maCumRap", data.maCumRap);
  console.log("data.maRap", data.maRap);
  console.log("data.setGiaVe", data.setGiaVe);
  useEffect(() => {
    if (
      data.setPhim &&
      data.ngayChieuGioChieu &&
      data.maCumRap &&
      data.setGiaVe
    )
      setIsReadyTaoLichChieu(true);
    else setIsReadyTaoLichChieu(false);
  }, [data.setPhim, data.ngayChieuGioChieu, data.maCumRap, data.setGiaVe]);

  useEffect(() => {
    if (successCreateShowtime) {
      enqueueSnackbar(successCreateShowtime, { variant: "success" });
      // dispatch(getTheaters2());
    }
    if (errorCreateShowtime) {
      enqueueSnackbar(errorCreateShowtime, { variant: "error" });
    }
    return () => dispatch(resetCreateShowtime());
  }, [errorCreateShowtime, successCreateShowtime]);
  const handleSelectPhim = (e) => {
    setData((data) => ({
      ...data,
      setPhim: e.target.value,
    }));

    theatersApi.getThongTinHeThongRap().then((result) => {
      setData((data) => ({
        ...data,
        heThongRapRender: result.data.content,
      }));
      console.log("handleSelectPhim", result.data.content);
    });
  };
  const handleSelectHeThongRap = (e) => {
    setData((data) => ({
      ...data,
      setHeThongRap: e.target.value.tenHeThongRap,
    }));

    theatersApi
      .getListCumRapTheoHeThong(e.target.value.maHeThongRap)
      .then((result) => {
        setData((data) => ({
          ...data,
          cumRapRender: result.data.content,
        }));
        console.log("handleSelectHeThongRap", result.data.content);
      });
  };
  const handleSelectCumRap = (e) => {
    setData((data) => ({
      ...data,
      setCumRap: e.target.value.tenCumRap,
      rapRender: e.target.value.danhSachRap,
      maRap: e.target.value.maCumRap,
    }));
    console.log("handleSelectCumRap", e.target.value);
  };

  const handleSelectRap = (e) => {
    setData((data) => ({
      ...data,
      setRap: e.target.value.tenRap,
      maCumRap: e.target.value.maRap,
    }));
    console.log("handleSelectRap", e.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date !== "Invalid Date") {
      const obj = new Date(date);
      setData((data) => ({
        ...data,
        ngayChieuGioChieu: `${obj.getDate().toString().padStart(2, 0)}/${(
          obj.getMonth() + 1
        )
          .toString()
          .padStart(2, 0)}/${obj.getFullYear()} ${obj
          .getHours()
          .toString()
          .padStart(2, 0)}:${obj.getMinutes().toString().padStart(2, 0)}:00`,
      }));
    }
    console.log("handleDateChange", date);
  };
  const handleSelectGiaVe = (e) => {
    setData((data) => ({
      ...data,
      setGiaVe: e.target.value,
    }));
    console.log(" e.target.value", e.target.value);
  };

  const handleTaoLichChieu = () => {
    if (loadingCreateShowtime || !isReadyTaoLichChieu) {
      // khi đang gửi requet hoặc chưa sẵn sàng thì không cho dispatch
      return;
    }
    dispatch(
      createShowtime({
        maPhim: data.setPhim,
        ngayChieuGioChieu: data.ngayChieuGioChieu,
        maRap: data.maRap,
        giaVe: data.setGiaVe,
      })
    ); // ngayChieuGioChieu phải có định dạng dd/MM/yyyy hh:mm:ss
  };

  const menuProps = {
    // props và class của menu(Popover)
    classes: { paper: classes.menu },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  };
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <div className={classes.backgroundImg}>
        <div className="row">
          <div className="col-6 px-0 px-md-3">
            <FormControl
              className={classes.search__item}
              focused={false}
              fullWidth
            >
              <Select
                value={data.setPhim}
                onChange={handleSelectPhim}
                displayEmpty // hiển thị item đầu tiên
                // MenuProps={menuProps}
              >
                {" "}
                <MenuItem
                  value=""
                  // style={{ display: data.openCtr?.phim ? "none" : "block" }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  Chọn Phim
                </MenuItem>
                {arrFilmDefault?.map((phim) => (
                  <MenuItem
                    value={phim.maPhim} // giá trị sẽ được đẩy lên
                    key={phim.maPhim}
                    classes={{
                      root: classes.menu__item,
                      selected: classes["menu__item--selected"],
                    }}
                  >
                    {phim.tenPhim}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6 px-0 px-md-3">
            <FormControl
              className={classes.search__item}
              focused={false}
              fullWidth
            >
              <Select
                value={data.setHeThongRap}
                onChange={handleSelectHeThongRap}
                renderValue={(value) =>
                  `${value ? value : "Chọn hệ thống rạp"}`
                } // hiển thị giá trị đã chọn
                displayEmpty // hiển thị item đầu tiên
                MenuProps={menuProps}
              >
                <MenuItem
                  value=""
                  style={{
                    display:
                      data.heThongRapRender?.length > 0 ? "none" : "block",
                  }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  {data.setPhim
                    ? `${
                        data.startRequest
                          ? "Đang tìm hệ thống rạp"
                          : "Không tìm thấy, vui lòng chọn phim khác"
                      }`
                    : "Vui lòng chọn phim"}
                </MenuItem>
                {data.heThongRapRender?.map((item) => (
                  <MenuItem
                    value={item}
                    key={item.maHeThongRap}
                    classes={{
                      root: classes.menu__item,
                      selected: classes["menu__item--selected"],
                    }}
                  >
                    {item.tenHeThongRap}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6 px-0 px-md-3">
            <FormControl
              className={classes.search__item}
              focused={false}
              fullWidth
            >
              <Select
                value={data.setCumRap}
                renderValue={(value) => `${value ? value : "Chọn cụm rạp"}`}
                onChange={handleSelectCumRap}
                displayEmpty // hiển thị item đầu tiên
              >
                <MenuItem
                  value=""
                  style={{
                    display: data.cumRapRender?.length > 0 ? "none" : "block",
                  }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  {data.setHeThongRap
                    ? `${
                        data.startRequest
                          ? "Đang tìm cụm rạp"
                          : "Không tìm thấy, vui lòng chọn hệ thống rạp khác"
                      }`
                    : "Vui lòng hệ thống rạp"}
                </MenuItem>
                {data.cumRapRender?.map((item) => (
                  <MenuItem
                    value={item}
                    key={item.maCumRap}
                    classes={{
                      root: classes.menu__item,
                      selected: classes["menu__item--selected"],
                    }}
                  >
                    {item.tenCumRap}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6 px-0 px-md-3">
            <FormControl
              className={classes.search__item}
              focused={false}
              fullWidth
            >
              <Select
                value={data.setRap}
                onChange={handleSelectRap}
                displayEmpty // hiển thị item đầu tiên
                renderValue={(value) => `${value ? value : "Chọn rạp"}`}
              >
                <MenuItem
                  value=""
                  style={{
                    display: data.rapRender?.length > 0 ? "none" : "block",
                  }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  Vui lòng chọn cụm rạp
                </MenuItem>
                {data.rapRender?.map((rap) => (
                  <MenuItem
                    value={rap}
                    key={rap.maRap}
                    classes={{
                      root: classes.menu__item,
                      selected: classes["menu__item--selected"],
                    }}
                  >
                    {rap.tenRap}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6 px-0 px-md-3">
            <FormControl
              className={classes.search__item}
              focused={false}
              fullWidth
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                  <KeyboardDateTimePicker
                    inputValue={selectedDate ? null : "Chọn ngày, giờ chiếu"} // khi chưa chọn thì "Chọn ngày, giờ chiếu" ghi đè lên value, khi đã chọn ngày thì return null để value={selectedDate} hiển thị ngày đã chọn
                    invalidDateMessage={
                      selectedDate ? "Invalid Date Format" : ""
                    } // bỏ qua lỗi nếu selectedDate = null
                    value={selectedDate} // giá trị truyền vào là obj date hoặc string chỉ ngày giờ đúng chuẩn có thể convert > tùy thuộc vào thư viện ngày tháng đang dùng(đang dùng date-fns)
                    onChange={handleDateChange}
                    format="yyyy-MM-dd, HH:mm" // HH:mm ~ 23:10, hh:mm là ~ 11:10 PM
                    // onAccept={handleDateAccept}
                    // ampm={false}
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </FormControl>
          </div>
          <div className="col-6 px-0 px-md-3">
            <FormControl
              className={classes.search__item}
              focused={false}
              fullWidth
            >
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.setGiaVe}
                onChange={handleSelectGiaVe}
                displayEmpty // hiển thị item đầu tiên
                renderValue={(value) =>
                  `${value ? value + " vnđ" : "Chọn giá vé"}`
                }
              >
                {data.giaVeRender?.map((giaVe) => (
                  <MenuItem
                    value={giaVe}
                    key={giaVe}
                    classes={{
                      root: classes.menu__item,
                      selected: classes["menu__item--selected"],
                    }}
                  >
                    {giaVe} vnđ
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className={classes.control}>
        <div className="row">
          {/* Search  */}
          <div className={`col-12 col-md-6 ${classes.itemCtro}`}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </div>
          {/* Tạo lịch chiếu  */}
          <div className={`col-12 col-md-6 ${classes.itemCtro}`}>
            <Button
              classes={{
                root: classes.btn,
              }}
              onClick={handleTaoLichChieu}
            >
              Tạo Lịch Chiếu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
