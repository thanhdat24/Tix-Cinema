import axiosClient from "../api/axiosClient";
import { GPID } from "../util/settings/config";
const moviesApi = {
  //lấy thông tin toàn bộ danh sách phim
  getDanhSachPhim: () => {
    const path = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02`;
    return axiosClient.get(path);
  },

  themPhimUploadHinh: (movie) => {
    const path = `/api/QuanLyPhim/ThemPhimUploadHinh`;
    //trong obj movie có key hinhAnh là file nên phải chuyển sang formData
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post(path, formData);
  },

  capNhatPhimUpload: (movie) => {
    const path = `/api/QuanLyPhim/CapNhatPhimUpload`;
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post(path, formData);
  },

  deleteMovie: (maPhim) => {
    const path = `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    return axiosClient.delete(path);
  },
};
export default moviesApi;
