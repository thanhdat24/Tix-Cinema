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
}
export const filmManagementService = new FilmManagementService();
