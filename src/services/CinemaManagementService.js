import { GPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class CinemaManagementService extends baseService {
  constructor() {
    super();
  }

  layThongTinHeThongRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GPID}`
    );
  };
}
export const cinemaManagementService = new CinemaManagementService();
