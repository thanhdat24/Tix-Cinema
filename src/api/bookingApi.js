import axiosClient from "./axiosClient";
const bookingApi = {
  //lấy thông tin phòng vé của 1 bộ phim
  getDanhSachPhongVe: (maLichChieu) => {
    const path = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    return axiosClient.get(path);
  },

  postDatVe: (data) => {
    const path = `/api/QuanLyDatVe/DatVe`;
    return axiosClient.post(path, data);
  },
  postTaoLichChieu: (data) => {
    const path = "/api/QuanLyDatVe/TaoLichChieu";
    return axiosClient.post(path, data);
  },
};

export default bookingApi;
