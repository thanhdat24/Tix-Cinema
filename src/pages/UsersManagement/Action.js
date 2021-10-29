import React from "react";

import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Tooltip from "@material-ui/core/Tooltip";

export default function ButtonDelete({ onDeleted, userItem, onEdit }) {
  return (
    <>
      <Tooltip title="Xóa">
        <IconButton
          color="primary"
          // style={{ color: isMovieSetShowtime ? "#00000042" : "#f50057" }}
          style={{ color: "#f50057" }}
          onClick={() => onDeleted(userItem.taiKhoan)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Chỉnh sửa">
        <IconButton
          color="primary"
          style={{ color: "#3f51b5" }}
          // onClick={() => onEdit(userItem)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
