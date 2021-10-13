import axiosClient from "../api/axiosClient";
const moviesApi = {
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
