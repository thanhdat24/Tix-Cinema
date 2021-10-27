import { GPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class FilmManagementService extends baseService {
  constructor() {
    super();
  }

  layDanhSachBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachPhim = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GPID}`);
  };

    getDanhSachPhim= () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GPID}`);
  };

  deleteMovie = (maPhim) => {
    // const path = `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    // return axiosClient.delete(path);
    return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };

  themPhimUploadHinh = (movieObj) => {
    const formData = new FormData();
    for (const key in movieObj) {
      formData.append(key, movieObj[key]);
    }
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    // trong obj movie có key hinhAnh là file nên phải chuyển sang formData
  };

  capNhatPhimUpload = (movie) => {
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    // return axiosClient.post(path, formData);
    return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  };
}
export const filmManagementService = new FilmManagementService();
