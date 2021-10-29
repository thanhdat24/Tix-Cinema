import React, { useEffect, useState, useRef } from "react";
import { useStyles, DialogContent, DialogTitle } from "./styles";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import slugify from "slugify";
import RenderCellExpand from "./RenderCellExpand";
import Action from "./Action";
import Dialog from "@material-ui/core/Dialog";
import Form from "./Form";

import {
  deleteMovie,
  getMovieListManagement,
  resetMoviesManagement,
  themPhimUploadHinhAction,
  updateMovieUpload,
} from "../../redux/actions/FilmManagementAction";
import ThumbnailYoutube from "./ThumbnailYoutube";

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
  const { enqueueSnackbar } = useSnackbar();
  const clearSetSearch = useRef(0);
  const [openModal, setOpenModal] = React.useState(false);
  const selectedPhim = useRef(null);
  console.log("selectedPhim", selectedPhim);
  const dispatch = useDispatch();
  let {
    arrFilmDefault,
    loadingUpdateMovie,
    successAddUploadMovie,
    successUpdateMovie,
    errorUpdateMovie,
    errorAddUploadMovie,
    loadingAddUploadMovie,
    loadingMovieList,
    loadingDeleteMovie,
    errorDeleteMovie,
    successDeleteMovie,
  } = useSelector((state) => state.FilmManagementReducer);
  console.log("arrFilmDefault", arrFilmDefault);

  useEffect(() => {
    if (
      arrFilmDefault ||
      successUpdateMovie ||
      successDeleteMovie ||
      errorDeleteMovie ||
      successAddUploadMovie
    ) {
      dispatch(getMovieListManagement());
    }
  }, [
    successUpdateMovie,
    successDeleteMovie,
    errorDeleteMovie,
    successAddUploadMovie,
  ]); // khi vừa thêm phim mới xong mà xóa liên backend sẽ báo lỗi xóa không được nhưng thực chất đã xóa thành công > errorDeleteMovie nhưng vẫn tiến hành làm mới lại danh sách

  useEffect(() => {
    return () => {
      dispatch(resetMoviesManagement());
    };
  }, []);
  useEffect(() => {
    if (arrFilmDefault) {
      let newMovieListDisplay = arrFilmDefault.map((movie) => ({
        ...movie,
        hanhDong: "",
        id: movie.maPhim,
      }));
      setMovieListDisplay(newMovieListDisplay);
    }
  }, [arrFilmDefault]);

  useEffect(() => {
    if (successUpdateMovie) {
      callApiChangeImageSuccess.current = true;
      enqueueSnackbar(
        `Update thành công phim: ${successUpdateMovie.tenPhim ?? ""}`,
        { variant: "success" }
      );
    }
    if (errorUpdateMovie) {
      callApiChangeImageSuccess.current = false;
      enqueueSnackbar(`${errorUpdateMovie ?? ""}`, { variant: "error" });
    }
  }, [successUpdateMovie, errorUpdateMovie]);
  useEffect(() => {
    if (successAddUploadMovie) {
      enqueueSnackbar(
        `Thêm thành công phim: ${successAddUploadMovie.tenPhim}`,
        {
          variant: "success",
        }
      );
    }
    if (errorAddUploadMovie) {
      enqueueSnackbar(errorAddUploadMovie, { variant: "error" });
    }
  }, [successAddUploadMovie, errorAddUploadMovie]);

  useEffect(() => {
    // delete movie xong thì thông báo
    if (successDeleteMovie) {
      enqueueSnackbar(successDeleteMovie, { variant: "success" });
      return;
    }
    if (errorDeleteMovie) {
      enqueueSnackbar(errorDeleteMovie, { variant: "error" });
    }
  }, [successDeleteMovie, errorDeleteMovie]);

  // xóa một phim
  const handleDeleteOne = (maPhim) => {
    if (!loadingDeleteMovie) {
      // nếu click xóa liên tục một user
      dispatch(deleteMovie(maPhim));
    }
  };
  const handleEdit = (phimItem) => {
    selectedPhim.current = phimItem;
    setOpenModal(true);
  };
  const onUpdate = (movieObj) => {
    if (loadingUpdateMovie) {
      return undefined;
    }
    setOpenModal(false);

    dispatch(updateMovieUpload(movieObj));
  };
  const onAddMovie = (movieObj) => {
    if (!loadingAddUploadMovie) {
      dispatch(themPhimUploadHinhAction(movieObj));
    }
    setOpenModal(false);
  };

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

    //trong obj movie có key hinhAnh là file nên phải chuyển sang formData
  };

  const handleInputSearchChange = (props) => {
    clearTimeout(clearSetSearch.current);
    clearSetSearch.current = setTimeout(() => {
      setValueSearch(props);
    }, 500);
  };

  const onFilter = () => {
    // dùng useCallback, slugify bỏ dấu tiếng việt
    let searchMovieListDisplay = movieListDisplay.filter((movie) => {
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

  const classes = useStyles();
  const columns = [
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
      width: 130,
      editable: true,
      renderCell: (params) => (
        <div style={{ display: "inline-block" }}>
          <ThumbnailYoutube urlYoutube={params.row.trailer} />
        </div>
      ),
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "hinhAnh",
      headerName: "Hình ảnh",
      type: "number",
      width: 150,
      align: "center",
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
    { field: "maPhim", hide: true, width: 130 },
    { field: "maNhom", hide: true, width: 130 },
    { field: "biDanh", hide: true, width: 200, renderCell: RenderCellExpand },
    {
      field: "hanhDong",
      headerName: "Hành Động",
      width: 150,
      renderCell: (params) => (
        <Action
          onEdit={handleEdit}
          onDeleted={handleDeleteOne}
          phimItem={params.row}
        />
      ),
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
  ];

  const modifySlugify = { lower: true, locale: "vi" };

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
                onChange={(evt) => handleInputSearchChange(evt.target.value)}
              />
            </div>
          </div>
          <div className={`col-12 col-md-6 ${classes.itemCtro}`}>
            <Button
              variant="contained"
              color="primary"
              className={classes.addMovie}
              onClick={handleAddMovie}
              disabled={loadingAddUploadMovie}
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
        // checkboxSelection
        rowsPerPageOptions={[10, 25, 50]}
        // hiện loading khi
        loading={loadingUpdateMovie || loadingDeleteMovie || loadingMovieList}
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
            onUpdate={onUpdate}
            onAddMovie={onAddMovie}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
