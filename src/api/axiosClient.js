import axios from "axios";
import { DOMAIN } from "../util/settings/config";

const axiosClient = axios.create({
  baseURL: DOMAIN,
});
axiosClient.interceptors.request.use((config) => {
  //tất cả request đều phải qua đây
  const user = localStorage.getItem("user");
  if (user) {
    // nếu có đăng nhập thì thực hiện
    const { accessToken } = JSON.parse(user);
    config.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosClient;
