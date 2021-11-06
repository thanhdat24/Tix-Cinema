export const DOMAIN = "http://movieapi.cyberlearn.vn";
// export const FAKE_AVATAR = `https://i.pravatar.cc/300?u=${avtIdUser}`;
export const TOKEN = "accessToken ";
export const GPID = "GP02";

export const DATE_BEGIN_DANGCHIEU = "2020-01-01"; // format: yyyy-mm-dd
export const DATE_END_DANGCHIEU = "2020-12-01";

export const DATE_BEGIN_SAPCHIEU = "2020-12-02";

export const DATE_END_SAPCHIEU = new Date().toISOString()?.slice(0, 10);

export const STATUS_CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const USER_LOGIN = "USER_LOGIN";
