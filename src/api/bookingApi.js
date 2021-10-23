import axiosClient from "./axiosClient";
const bookingApi = {
  postTaoLichChieu: (data) => {
    const path = "/api/QuanLyDatVe/TaoLichChieu";
    return axiosClient.post(path, data);
  },
};

export default bookingApi;
