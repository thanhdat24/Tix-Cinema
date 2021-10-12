import React, { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DateTimePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import { materialTheme } from "./styles";
import TextField from "./Textfield";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
export default function FormInput({ selectedPhim, onUpdate, onAddMovie }) {
  const classes = useStyles();

  const [srcImage, setSrcImage] = useState(selectedPhim?.hinhAnh);
  const [selectedDate, handleDateChange] = useState(new Date());
  const setThumbnailPreviews = (e) => {
    let file = e.target;
    var reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onload = function () {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(reader.result);
    };
  };

  const movieSchema = yup.object().shape({
    tenPhim: yup.string().required("*Không được bỏ trống!"),
    trailer: yup
      .string()
      .required("*Không được bỏ trống!")
      .matches(
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        "*Sai link youtube"
      ),
    hinhAnh: yup.string().required("*Chưa chọn hình!"),
    moTa: yup
      .string()
      .required("*Không được bỏ trống!")
      .min(100, "Mô tả cần 100 ký tự trở lên!"),
    ngayKhoiChieu: yup.string().required("*Chưa chọn ngày!"),
    danhGia: yup
      .number()
      .required("*Không được bỏ trống!")
      .min(0, "*Điểm đánh giá phải từ 0 đến 10")
      .integer("*Điểm đánh giá phải từ 0 đến 10")
      .max(10, "*Điểm đánh giá phải từ 0 đến 10"),
  });

  const handleSubmit = (movieObj) => {
    let hinhAnh = movieObj.hinhAnh;
    let fakeImage = { srcImage, maPhim: movieObj.maPhim };
    movieObj = {
      ...movieObj,
      ngayKhoiChieu: movieObj.ngayKhoiChieu.toLocaleDateString("en-GB"),
    };
    if (selectedPhim.maPhim) {
      onUpdate(movieObj, hinhAnh, fakeImage);
      return;
    }
    const newMovieObj = { ...movieObj };
    delete newMovieObj.maPhim;
    delete newMovieObj.biDanh;
    delete newMovieObj.danhGia;
    onAddMovie(newMovieObj);
  };

  return (
    <Formik
      initialValues={{
        maPhim: selectedPhim.maPhim,
        tenPhim: selectedPhim.tenPhim,
        biDanh: selectedPhim.biDanh,
        trailer: selectedPhim.trailer,
        hinhAnh: selectedPhim.hinhAnh,
        moTa: selectedPhim.moTa,
        maNhom: "GP09",
        ngayKhoiChieu: selectedPhim?.ngayKhoiChieu
          ? new Date(selectedPhim.ngayKhoiChieu)
          : new Date(),
        danhGia: selectedPhim.danhGia,
      }}
      validationSchema={movieSchema}
      onSubmit={handleSubmit}
    >
      {(formikProp) => (
        <Form>
          <div className="form-group">
            {/* <label>Tên Phim&nbsp;</label> */}
            <TextField
              name="tenPhim"
              fullWidth
              label="Tên Phim"
              id="fullWidth"
            />
            <ErrorMessage
              name="tenPhim"
              render={(msg) => <span className="text-danger">{msg}</span>}
            />

            {/* <Field name="tenPhim" className="form-control" /> */}
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              name="trailer"
              label="Trailer"
              id="fullWidth"
            />
            {/* <label>Trailer&nbsp;</label> */}
            <ErrorMessage
              name="trailer"
              render={(msg) => <span className="text-danger">{msg}</span>}
            />
            {/* <Field name="trailer" className="form-control" /> */}
          </div>
          <div className="form-group">
            <label>Hình ảnh&nbsp;</label>
            <ErrorMessage
              name="hinhAnh"
              render={(msg) => <span className="text-danger">{msg}</span>}
            />
            <div className="form-row">
              <div className="col-2">
                {srcImage ? (
                  <img
                    src={srcImage}
                    id="image-selected"
                    alt="movie"
                    className="img-fluid rounded"
                  />
                ) : (
                  <ImageOutlinedIcon style={{ fontSize: 60 }} />
                )}
              </div>
              <div className="col-10">
                <input
                  type="file"
                  accept=".jpg,.png"
                  id="contained-button-file"
                  className="form-control"
                  onChange={(e) => {
                    formikProp.setFieldValue(
                      "hinhAnh",
                      e.currentTarget.files[0]
                    );
                    setThumbnailPreviews(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            {/* <label>Mô tả&nbsp;</label> */}
            <TextField
              fullWidth
              name="moTa"
              label="Mô tả"
              id="fullWidth"
              multiline={true}
              rows={2}
            />
            <ErrorMessage
              name="moTa"
              render={(msg) => <span className="text-danger">{msg}</span>}
            />
            {/* <Field as="textarea" name="moTa" className="form-control" /> */}
          </div>
          <div className="form-group">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <KeyboardDatePicker
                  fullWidth
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Ngày khởi chiếu"
                  value={formikProp.values.ngayKhoiChieu}
                  onChange={(date) =>
                    formikProp.setFieldValue("ngayKhoiChieu", date)
                  }
                  format="MM/dd/yyyy"
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
          <div
            className="form-group"
            hidden={selectedPhim.maPhim ? false : true}
          >
            <label>Đánh giá&nbsp;</label>
            <ErrorMessage
              name="danhGia"
              render={(msg) => <span className="text-danger">{msg}</span>}
            />
            <Field name="danhGia" type="number" className="form-control" />
          </div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
