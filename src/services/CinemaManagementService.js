import { GPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class CinemaManagementService extends baseService {
  constructor() {
    super();
  }

  layThongTinLichChieuRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GPID}`
    );
  };
  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };

}
export const cinemaManagementService = new CinemaManagementService();
