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

  layThongTinNguoiDung = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };

  getDanhSachNguoiDung = () => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02`);
  };

  postThemNguoiDung = (user) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, user);
  };
  deleteUser = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
  postCapNhapThongTinNguoiDung = (user) => {
    return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
  };
}

export const userManagementService = new UserManagementService();
