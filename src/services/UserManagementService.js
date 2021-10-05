import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";
export class UserManagementService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    // {taiKhoan:'',matKhau:''}
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  layThongTinNguoiDung = ()=>{
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    
  }
}

export const userManagementService = new UserManagementService();