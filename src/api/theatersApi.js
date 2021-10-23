import axiosClient from "./axiosClient";
const theatersApi = {
  //lấy thông tin toàn bộ danh sách hệ thống rạp
  getThongTinHeThongRap: () => {
    const path = "/api/QuanLyRap/LayThongTinHeThongRap";
    return axiosClient.get(path);
  },

  //lấy thông tin các cum rap của 1 hệ thống
  getListCumRapTheoHeThong: (maHeThongRap) => {
    const path = `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`;
    return axiosClient.get(path);
  },

  
};

export default theatersApi;
