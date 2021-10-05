import { GPID } from "../util/settings/config";
import { baseService } from "./baseService";
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
export class BookingTicketManagementService extends baseService {
  constructor() {
    super();
  }

  layDanhSachPhongVe = (maLichChieu) => {
    // mã lịch chiếu lấy từ url
    return this.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };

  layThongTinDatVe = (thongTinDatVe = new ThongTinDatVe()) => {
    return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
  };
}
export const bookingTicketManagementService =
  new BookingTicketManagementService();
