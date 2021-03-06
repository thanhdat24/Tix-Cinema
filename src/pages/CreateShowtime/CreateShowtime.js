import React, { useEffect, useRef, useState } from "react";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";

import { CircularProgress, Tooltip } from "@material-ui/core";
import slugify from "slugify";
import { layDanhSachHeThongRap2Action } from "../../redux/actions/CinemaManagementAction";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <CircularProgress style={{ margin: "auto" }} />
    </GridOverlay>
  );
}

export default function CreateShowtime() {
  const { enqueueSnackbar } = useSnackbar();
  const [lichChieuDisplay, setLichChieuDisplay] = useState([]);
  let { arrFilmDefault } = useSelector((state) => state.FilmManagementReducer);
  const { theaterList, loadingTheaterList } = useSelector(
    (state) => state.CinemaManagementReducer
  );
  const { loadingCreateShowtime, successCreateShowtime, errorCreateShowtime } =
    useSelector((state) => state.BookingTicketManagementReducer);
  const dispatch = useDispatch();
  const [valueSearch, setValueSearch] = useState("");
  const clearSetSearch = useRef(0);

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

    startRequest: false, // l???a ch???n gi???a hi???n th??? "??ang t??m" hay "kh??ng t??m th???y"

    openCtr: {
      phim: false,
      heThongRap: false,
      cumRap: false,
      rap: false,
      ngayChieuGioChieu: false,
      giaVe: false,
    },
  });

  const [isReadyTaoLichChieu, setIsReadyTaoLichChieu] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (arrFilmDefault) {
      dispatch(getMovieListManagement());
    }
  }, []);

  useEffect(() => {
    if (!theaterList.length) {
      dispatch(layDanhSachHeThongRap2Action());
    }
  }, []);
  console.log("theaterList", theaterList);
  useEffect(() => {
    const showTimeList = theaterList?.reduce((collect1, heThongRap) => {
      return [
        ...collect1,
        ...heThongRap.lstCumRap?.reduce((collect2, cumRap) => {
          return [
            ...collect2,
            ...cumRap.danhSachPhim?.reduce((collect3, phim) => {
              return [
                ...collect3,
                ...phim.lstLichChieuTheoPhim?.reduce((collect4, lichChieu) => {
                  return [
                    ...collect4,
                    {
                      ...lichChieu,
                      tenHeThongRap: heThongRap.tenHeThongRap,
                      tenCumRap: cumRap.tenCumRap,
                      maRap: lichChieu.maRap,
                      tenRap: lichChieu.tenRap,
                      logo: heThongRap.logo,
                      diaChi: cumRap.diaChi,
                      maPhim: phim.maPhim,
                      tenPhim: phim.tenPhim,
                      id: lichChieu.maLichChieu,
                      ngayChieuGioChieu: `${lichChieu.ngayChieuGioChieu.slice(
                        0,
                        10
                      )}, ${lichChieu.ngayChieuGioChieu.slice(11, 16)}`,
                    },
                  ];
                }, []),
              ];
            }, []),
          ];
        }, []),
      ];
    }, []);
    setLichChieuDisplay(showTimeList);
  }, [theaterList]);

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
      dispatch(layDanhSachHeThongRap2Action());
    }
    if (errorCreateShowtime) {
      enqueueSnackbar(errorCreateShowtime, { variant: "error" });
    }
    return () => dispatch(resetCreateShowtime());
  }, [errorCreateShowtime, successCreateShowtime]);

  // Open, Close Selected Phim

  const handleOpenPhim = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, phim: true } }));
  };
  const handleClosePhim = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, phim: false } }));
  };

  // Open, Close Selected H??? Th???ng R???p
  const handleOpenHeThongRap = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, heThongRap: true },
    }));
  };
  const handleCloseHeThongRap = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, heThongRap: false },
    }));
  };

  // Open, Close Selected C???m R???p
  const handleOpenCumRap = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, cumRap: true },
    }));
  };
  const handleCloseCumRap = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, cumRap: false },
    }));
  };
  // Open, Close Selected R???p
  const handleOpenRap = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, rap: true } }));
  };
  const handleCloseRap = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, rap: false } }));
  };

  // Open, Close Selected NgayChieuGioChieu
  const handleOpenNgayChieuGioChieu = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ngayChieuGioChieu: true },
    }));
  };
  const handleCloseNgayChieuGioChieu = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ngayChieuGioChieu: false },
    }));
  };

  // Open, Close Selected GiaVe
  const handleOpenGiaVe = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, giaVe: true } }));
  };
  const handleCloseGiaVe = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, giaVe: false },
    }));
  };
  // Handle Select values
  const handleSelectPhim = (e) => {
    const isOpenHeThongRap = data.setHeThongRap ? false : true;
    setData((data) => ({
      ...data,
      setPhim: e.target.value,
      startRequest: true,
      openCtr: { ...data.openCtr, heThongRap: isOpenHeThongRap },
    }));

    theatersApi.getThongTinHeThongRap().then((result) => {
      setData((data) => ({
        ...data,
        heThongRapRender: result.data.content,
        startRequest: false,
      }));
      console.log("handleSelectPhim", result.data.content);
    });
  };
  const handleSelectHeThongRap = (e) => {
    setData((data) => ({
      ...data,
      setHeThongRap: e.target.value.tenHeThongRap,
      startRequest: true,
      openCtr: { ...data.openCtr, cumRap: true },
      //reset
      setCumRap: "",
      rapRender: [],
      setRap: "",
      maRap: "",
    }));

    theatersApi
      .getListCumRapTheoHeThong(e.target.value.maHeThongRap)
      .then((result) => {
        setData((data) => ({
          ...data,
          cumRapRender: result.data.content,
          startRequest: false,
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
      openCtr: { ...data.openCtr, rap: true },
      //reset
      setRap: "",
    }));
    console.log("handleSelectCumRap", e.target.value);
  };

  const handleSelectRap = (e) => {
    const openNgayChieuGioChieu = data.ngayChieuGioChieu ? false : true;

    setData((data) => ({
      ...data,
      setRap: e.target.value.tenRap,
      maCumRap: e.target.value.maRap,
      openCtr: {
        ...data.openCtr,
        ngayChieuGioChieu: openNgayChieuGioChieu,
      },
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
        openCtr: {
          ...data.openCtr,
          giaVe: true,
        },
      }));
    }
    console.log("handleDateChange", date);
  };
  const handleSelectGiaVe = (e) => {
    setData((data) => ({
      ...data,
      setGiaVe: e.target.value,
      openCtr: { ...data.openCtr, giaVe: false },
    }));
    console.log(" e.target.value", e.target.value);
  };

  const handleTaoLichChieu = () => {
    if (loadingCreateShowtime || !isReadyTaoLichChieu) {
      // khi ??ang g???i requet ho???c ch??a s???n s??ng th?? kh??ng cho dispatch
      return;
    }
    dispatch(
      createShowtime({
        maPhim: data.setPhim,
        ngayChieuGioChieu: data.ngayChieuGioChieu,
        maRap: data.maRap,
        giaVe: data.setGiaVe,
      })
    ); // ngayChieuGioChieu ph???i c?? ?????nh d???ng dd/MM/yyyy hh:mm:ss
  };

  const handleInputSearchChange = (props) => {
    clearTimeout(clearSetSearch.current);
    clearSetSearch.current = setTimeout(() => {
      setValueSearch(props);
    }, 500);
  };

  const onFilter = () => {
    const searchLichChieuDisplay = lichChieuDisplay.filter((lichChieu) => {
      const matchTenHeThongRap =
        slugify(lichChieu?.tenHeThongRap ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchTenCumRap =
        slugify(lichChieu?.tenCumRap ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchDiaChi =
        slugify(lichChieu?.diaChi ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchTenRap =
        slugify(lichChieu?.tenRap ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchTenPhim =
        slugify(lichChieu?.tenPhim ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchNgayChieuGioChieu =
        slugify(
          lichChieu?.ngayChieuGioChieu.toLocaleString() ?? "",
          modifySlugify
        ).indexOf(slugify(valueSearch, modifySlugify)) !== -1;
      const matchGiaVe =
        slugify(lichChieu?.giaVe.toString() ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchMaPhim =
        slugify(lichChieu?.maPhim.toString() ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchMaRap =
        slugify(lichChieu?.maRap.toString() ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchMalichChieu =
        slugify(lichChieu?.maLichChieu.toString() ?? "", modifySlugify).indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      return (
        matchTenHeThongRap ||
        matchTenCumRap ||
        matchDiaChi ||
        matchTenRap ||
        matchTenPhim ||
        matchNgayChieuGioChieu ||
        matchGiaVe ||
        matchMaPhim ||
        matchMaRap ||
        matchMalichChieu
      );
    });
    return searchLichChieuDisplay;
  };

  const columns = [
    {
      field: "maLichChieu",
      headerName: "M?? l???ch chi???u",
      hide: true,
      width: 130,
    },
    { field: "logo", hide: true, width: 130 },
    {
      field: "tenHeThongRap",
      headerName: "H??? th???ng r???p",
      width: 170,
      renderCell: (params) => (
        <Tooltip title={params.row.tenHeThongRap}>
          <img
            style={{
              maxWidth: "100%",
              height: "100%",
              borderRadius: 4,
              marginRight: 15,
            }}
            src={params.row.logo}
            alt="logo h??? th???ng r???p"
          />
        </Tooltip>
      ),
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "tenCumRap",
      headerName: "T??n C???m R???p",
      width: 300,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
      // renderCell: RenderCellExpand,
    },
    {
      field: "diaChi",
      headerName: "?????a ch???",
      width: 258,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
      // renderCell: RenderCellExpand,
    },
    {
      field: "tenRap",
      headerName: "T??n R???p",
      width: 200,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    { field: "maRap", headerName: "M?? r???p", hide: true, width: 130 },
    { field: "maPhim", headerName: "M?? phim", hide: true, width: 130 },
    {
      field: "tenPhim",
      headerName: "T??n phim",
      width: 250,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
      // renderCell: RenderCellExpand,
    },
    {
      field: "ngayChieuGioChieu",
      headerName: "Ng??y chi???u gi??? chi???u",
      width: 200,
      type: "dateTime",
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
    {
      field: "giaVe",
      headerName: "Gi?? v??(vn??)",
      width: 130,
      type: "number",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
  ];

  const menuProps = {
    // props v?? class c???a menu(Popover)
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

  const modifySlugify = { lower: true, locale: "vi" };

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
                open={data.openCtr.phim}
                onClose={handleClosePhim}
                onOpen={handleOpenPhim}
                value={data.setPhim}
                onChange={handleSelectPhim} // value={phim.maPhim} t??? ?????ng truy???n v??o handleSelectPhim sau khi ch???n phim
                displayEmpty // hi???n th??? item ?????u ti??n
                IconComponent={ExpandMoreIcon}
                MenuProps={menuProps}
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
                  Ch???n Phim
                </MenuItem>
                {arrFilmDefault?.map((phim) => (
                  <MenuItem
                    value={phim.maPhim} // gi?? tr??? s??? ???????c ?????y l??n
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
                open={data.openCtr.heThongRap}
                onClose={handleCloseHeThongRap}
                onOpen={handleOpenHeThongRap}
                value={data.setHeThongRap}
                onChange={handleSelectHeThongRap}
                renderValue={(value) =>
                  `${value ? value : "Ch???n h??? th???ng r???p"}`
                } // hi???n th??? gi?? tr??? ???? ch???n
                displayEmpty // hi???n th??? item ?????u ti??n
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
                          ? "??ang t??m h??? th???ng r???p"
                          : "Kh??ng t??m th???y, vui l??ng ch???n phim kh??c"
                      }`
                    : "Vui l??ng ch???n phim"}
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
                open={data.openCtr.cumRap}
                onClose={handleCloseCumRap}
                onOpen={handleOpenCumRap}
                value={data.setCumRap}
                renderValue={(value) => `${value ? value : "Ch???n c???m r???p"}`}
                onChange={handleSelectCumRap}
                displayEmpty // hi???n th??? item ?????u ti??n
                MenuProps={menuProps}
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
                          ? "??ang t??m c???m r???p"
                          : "Kh??ng t??m th???y, vui l??ng ch???n h??? th???ng r???p kh??c"
                      }`
                    : "Vui l??ng h??? th???ng r???p"}
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
                open={data.openCtr.rap}
                onClose={handleCloseRap}
                onOpen={handleOpenRap}
                value={data.setRap}
                onChange={handleSelectRap}
                displayEmpty // hi???n th??? item ?????u ti??n
                renderValue={(value) => `${value ? value : "Ch???n r???p"}`}
                MenuProps={menuProps}
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
                  Vui l??ng ch???n c???m r???p
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
                    open={data.openCtr.ngayChieuGioChieu}
                    onClose={handleCloseNgayChieuGioChieu}
                    onOpen={handleOpenNgayChieuGioChieu}
                    inputValue={selectedDate ? null : "Ch???n ng??y, gi??? chi???u"} // khi ch??a ch???n th?? "Ch???n ng??y, gi??? chi???u" ghi ???? l??n value, khi ???? ch???n ng??y th?? return null ????? value={selectedDate} hi???n th??? ng??y ???? ch???n
                    invalidDateMessage={
                      selectedDate ? "Invalid Date Format" : ""
                    } // b??? qua l???i n???u selectedDate = null
                    value={selectedDate} // gi?? tr??? truy???n v??o l?? obj date ho???c string ch??? ng??y gi??? ????ng chu???n c?? th??? convert > t??y thu???c v??o th?? vi???n ng??y th??ng ??ang d??ng(??ang d??ng date-fns)
                    onChange={handleDateChange}
                    format="yyyy-MM-dd, HH:mm" // HH:mm ~ 23:10, hh:mm l?? ~ 11:10 PM
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
                open={data.openCtr.giaVe}
                onClose={handleCloseGiaVe}
                onOpen={handleOpenGiaVe}
                value={data.setGiaVe}
                onChange={handleSelectGiaVe}
                displayEmpty // hi???n th??? item ?????u ti??n
                renderValue={(value) =>
                  `${value ? value + " vn??" : "Ch???n gi?? v??"}`
                }
                MenuProps={menuProps}
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
                    {giaVe} vn??
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
                placeholder="Search???"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(evt) => handleInputSearchChange(evt.target.value)}
              />
            </div>
          </div>
          {/* T???o l???ch chi???u  */}
          <div className={`col-12 col-md-6 ${classes.itemCtro}`}>
            <Button
              disabled={!isReadyTaoLichChieu}
              classes={{
                root: classes.btn,
                // ???n ??i n??t t???o l???ch chi???u ch???n xong values m???i hi???n
                disabled: classes.btnDisabled,
              }}
              onClick={handleTaoLichChieu}
            >
              T???o L???ch Chi???u
            </Button>
          </div>
        </div>
      </div>
      {/* Danh sach r???p chi???u */}
      <DataGrid
        className={classes.rootDataGrid}
        rows={onFilter()}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[10, 25, 50]}
        loading={loadingTheaterList}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Toolbar: GridToolbar,
        }}
        sortModel={[{ field: "tenHeThongRap", sort: "asc" }]}
      />
    </div>
  );
}
