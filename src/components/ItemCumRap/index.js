import React, { Fragment } from "react";

import Address from "./Address";
import TenCumRap from "../TenCumRap";
import {
  useStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "./style";
import BtnGoToCheckout from "../BtnGoToCheckOut";
import FakeImgTheater from "../FakeImgTheater/fakeImgTheater";

export default function ItemCumRap({
  tenCumRap,
  maLichChieu,
  lichChieuPhim,
  diaChi,
  defaultExpanded,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.cumRapItem}>
        <Accordion
          key={tenCumRap}
          square
          defaultExpanded={defaultExpanded ?? false}
        >
          <AccordionSummary>
            <FakeImgTheater
              nameTheater={tenCumRap}
              imgStyle={classes.imgTheater}
            />
            <div className={classes.wrapInfo}>
              <TenCumRap tenCumRap={tenCumRap} />
              <Address maLichChieu={maLichChieu} diaChiAlreadyExist={diaChi} />
            </div>
            <div style={{ clear: "both" }}></div>
          </AccordionSummary>
          <AccordionDetails>
            {lichChieuPhim.map((lcp) => (
              <Fragment key={lcp.maLichChieu}>
                <BtnGoToCheckout lichChieuTheoPhim={lcp} />
              </Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
