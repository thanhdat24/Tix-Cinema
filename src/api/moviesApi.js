import axiosClient from "../api/axiosClient";
const moviesApi = {
  //lấy thông tin toàn bộ danh sách phim
  getDanhSachPhim: () => {
    const path = "/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02";
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
};
export default moviesApi;
