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

export default function CreateShowtime() {
  let { arrFilmDefault } = useSelector((state) => state.FilmManagementReducer);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({
    setPhim: "",
    setHeThongRap: "",
    setCumRap: "",
    setRap: "",
    ngayChieuGioChieu: null,
    setGiaVe: "",
  });
  useEffect(() => {
    if (arrFilmDefault) {
      dispatch(getMovieListManagement());
    }
  }, []);
  const handleSelectPhim = (e) => {};
  const handleSelectHeThongRap = (e) => {};
  const handleSelectCumRap = (e) => {};
  const handleSelectRap = (e) => {};
  const handleDateChange = (e) => {};
  const handleSelectGiaVe = (e) => {};
  const classes = useStyles();
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
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.setPhim}
                onChange={handleSelectPhim}
                displayEmpty // hiển thị item đầu tiên
              >
                {" "}
                <MenuItem
                  value=""
                  style={{ display: data.openCtr?.phim ? "none" : "block" }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  Chọn Phim
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.setHeThongRap}
                onChange={handleSelectHeThongRap}
                displayEmpty // hiển thị item đầu tiên
              >
                {" "}
                <MenuItem
                  value=""
                  style={{ display: data.openCtr?.phim ? "none" : "block" }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  Chọn hệ thống rạp
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.setCumRap}
                onChange={handleSelectCumRap}
                displayEmpty // hiển thị item đầu tiên
              >
                {" "}
                <MenuItem
                  value=""
                  style={{ display: data.openCtr?.phim ? "none" : "block" }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  Chọn cụm rạp
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={data.setRap}
                onChange={handleSelectRap}
                displayEmpty // hiển thị item đầu tiên
              >
                {" "}
                <MenuItem
                  value=""
                  style={{ display: data.openCtr?.phim ? "none" : "block" }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  Chọn rạp
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                    ampm={false}
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
              >
                {" "}
                <MenuItem
                  value=""
                  style={{ display: data.openCtr?.phim ? "none" : "block" }}
                  classes={{
                    root: classes.menu__item,
                    selected: classes["menu__item--selected"],
                  }}
                >
                  Chọn giá vé
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
            >
              Tạo Lịch Chiếu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
