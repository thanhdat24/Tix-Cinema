const colorTheater = {
  BHD: "#8bc541",
  CGV: "#e71a0f",
  CNS: "#df0d7a",
  GLX: "#ff751a",
  LOT: "#cf544b",
  MEG: "#eeb730",
};
const logoTheater = {
  BHD: "/assets/img/logo-theater/bhd.png",
  CGV: "/assets/img/logo-theater/cgv.png",
  CNS: "/assets/img/logo-theater/cin.png",
  GLX: "/assets/img/logo-theater/gal.png",
  LOT: "/assets/img/logo-theater/lot.png",
  MEG: "/assets/img/logo-theater/meg.png",
};

const allCumRapImg = [
  "/assets/img/cumRap/bhd-star-bitexco-16105952137769.png",
  "/assets/img/cumRap/bhd-star-pham-hung-16105959230642.png",
  "/assets/img/cumRap/bhd-star-vincom-3-2-16105957596860.png",
  "/assets/img/cumRap/bhd-star-vincom-le-van-viet-16105962051265.png",
  "/assets/img/cumRap/bhd-star-vincom-quang-trung-16105960645760.png",
  "/assets/img/cumRap/bhd-star-vincom-thao-dien-16105955634183.png",
  "/assets/img/cumRap/cinestar-hai-ba-trung-15383833704033.jpg",
  "/assets/img/cumRap/cinestar-quoc-thanh-15379636956745.jpg",
  "/assets/img/cumRap/ddc-dong-da-15379624326697.jpg",
  "/assets/img/cumRap/lotte-cinema-cong-hoa-15383860949090.jpg",
  "/assets/img/cumRap/lotte-cinema-go-vap-15383873960955.jpg",
  "/assets/img/cumRap/lotte-cinema-phu-tho-15383865322515.jpg",
  "/assets/img/cumRap/lotte-cinema-thu-duc-15383864347748.jpg",
  "/assets/img/cumRap/mega-gs-cao-thang-15380164745357.jpg",
];
function returnRandomItem() {
  return allCumRapImg[Math.floor(Math.random() * 14)];
}
const dataFakeImgTheater = [];

export { colorTheater, logoTheater, returnRandomItem, dataFakeImgTheater };
