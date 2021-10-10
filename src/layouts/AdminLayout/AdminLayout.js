import React from "react";
import { SnackbarProvider } from "notistack";
import TopBar from "./TopBar";
import NavBar from "./NavBar/NavBar";
import { useState } from "react";

export default function AdminLayout(props) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    // package notistack: popup thông báo nhỏ gọn
    <SnackbarProvider maxSnack={3}>
      <TopBar />
      <div className="row">
        <div style={{ width: 255 }}>
          {/* đây là phần NavBar nằm bên trái, có thể đóng mở khi màn hình nhỏ */}
          <NavBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
        </div>
        <div style={{ width: "calc(100% - 255px)" }}>
          {/* đây là nội dung chính: UserManagement, MoviesManagement, ReateShowtime */}
          {props.children}
        </div>
      </div>
    </SnackbarProvider>
  );
}
