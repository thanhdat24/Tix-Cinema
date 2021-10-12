import React, { useEffect, useState, useRef } from "react";
import { useStyles, DialogContent, DialogTitle } from "./styles";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { getFilmManagementAction } from "../../redux/actions/FilmManagementAction";
import slugify from "slugify";
import RenderCellExpand from "./RenderCellExpand";
import Action from "./Action";
import Dialog from "@material-ui/core/Dialog";
import Form from "./Form";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <CircularProgress style={{ margin: "auto" }} />
    </GridOverlay>
  );
}
export default function MoviesManagement() {
  const [movieListDisplay, setMovieListDisplay] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const newImageUpdate = useRef("");
  const callApiChangeImageSuccess = useRef(false);
  const [openModal, setOpenModal] = React.useState(false);
  const selectedPhim = useRef(null);

  const dispatch = useDispatch();
  const { arrFilmDefault } = useSelector(
    (state) => state.FilmManagementReducer
  );
  console.log("arrFilmDefault", arrFilmDefault);
  // console.log("arr", arr);

  useEffect(() => {
    dispatch(getFilmManagementAction());
  }, []);

  // useEffect(() => {
  //   if (arrFilmDefault) {
  //     let newMovieListDisplay = arrFilmDefault.map((movie) => ({
  //       ...movie,
  //       hanhDong: "",
  //       id: movie.maPhim,
  //     }));
  //     setMovieListDisplay(newMovieListDisplay);
  //   }
  // }, [arrFilmDefault]);
  const classes = useStyles();
  const columns = [
    {
      field: "maPhim",
      headerName: "Tên Phim",
      width: 250,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
      hide: true,
    },
    {
      field: "tenPhim",
      headerName: "Tên Phim",
      width: 250,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
    {
      field: "trailer",
      headerName: "Trailer",
      width: 150,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "hinhAnh",
      headerName: "Hình ảnh",
      type: "number",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => RenderCellExpand(params),
    },
    {
      field: "moTa",
      headerName: "Mô Tả",
      width: 200,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
      renderCell: RenderCellExpand,
    },
    {
      field: "ngayKhoiChieu",
      headerName: "Ngày khởi chiếu",
      width: 190,
      type: "date",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      valueFormatter: (params) => params.value.slice(0, 10),
    },
    {
      field: "danhGia",
      headerName: "Đánh giá",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "hanhDong",
      headerName: "Hành Động",
      width: 150,
      renderCell: (params) => (
        <Action
          // onEdit={handleEdit}
          // onDeleted={handleDeleteOne}
          phimItem={params.row}
        />
      ),
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
  ];

  const handleAddMovie = () => {
    const emtySelectedPhim = {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: "",
      ngayKhoiChieu: "",
      danhGia: 10,
    };
    selectedPhim.current = emtySelectedPhim;
    setOpenModal(true);
  };

  const modifySlugify = { lower: true, locale: "vi" };

  const onFilter = () => {
    // dùng useCallback, slugify bỏ dấu tiếng việt
    let searchMovieListDisplay = arrFilmDefault.filter((movie) => {
      const matchTenPhim =
        slugify(movie.tenPhim ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchMoTa =
        slugify(movie.moTa ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchNgayKhoiChieu =
        slugify(movie.ngayKhoiChieu ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      return matchTenPhim || matchMoTa || matchNgayKhoiChieu;
    });
    if (newImageUpdate.current && callApiChangeImageSuccess.current) {
      // hiển thị hình bằng base64 thay vì url, lỗi react không hiển thị đúng hình mới cập nhật(đã cập hình thanh công nhưng url backend trả về giữ nguyên đường dẫn)
      searchMovieListDisplay = searchMovieListDisplay.map((movie) => {
        if (movie.maPhim === newImageUpdate.current.maPhim) {
          return { ...movie, hinhAnh: newImageUpdate.current.srcImage };
        }
        return movie;
      });
    }
    return searchMovieListDisplay;
  };

  // const rows = arrFilmDefault;

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <div className={classes.control}>
        <div className="row">
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
                // onChange={(evt) => handleInputSearchChange(evt.target.value)}
              />
            </div>
          </div>
          <div className={`col-12 col-md-6 ${classes.itemCtro}`}>
            <Button
              variant="contained"
              color="primary"
              className={classes.addMovie}
              onClick={handleAddMovie}
              // disabled={loadingAddUploadMovie}
              startIcon={<AddBoxIcon />}
            >
              thêm phim
            </Button>
          </div>
        </div>
      </div>
      <DataGrid
        className={classes.rootDataGrid}
        rows={onFilter()}
        columns={columns}
        pageSize={25}
        checkboxSelection
        rowsPerPageOptions={[10, 25, 50]}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Toolbar: GridToolbar,
        }}
        getRowId={(row) => row.maPhim}
      />
      <Dialog open={openModal}>
        <DialogTitle onClose={() => setOpenModal(false)}>
          {selectedPhim?.current?.tenPhim
            ? `Sửa phim: ${selectedPhim?.current?.tenPhim}`
            : "Thêm Phim"}
        </DialogTitle>
        <DialogContent dividers>
          <Form
            selectedPhim={selectedPhim.current}
            // onUpdate={onUpdate}
            // onAddMovie={onAddMovie}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
