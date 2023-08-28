import "./App.css";
import Router from "./Router/router";
import getCookie from "./utils/getCookie";
import axios from "axios";
import setCookie from "./utils/setCookie";
import { useEffect } from "react";

let tokenRefreshInterval;

const refreshTokenHandle = async (refreshToken) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/users/refresh_token",
      {
        headers: {
          refresh_token: refreshToken,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const newAccessToken = response.data.access_token;

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

const checkAndRefreshToken = async () => {
  const accessToken = getCookie("access_token") || "";
  const refreshToken =
    getCookie("refresh_token")?.replace(/^"(.*)"$/, "$1") || "";

  if (!accessToken && refreshToken) {
    try {
      const newAccessToken = await refreshTokenHandle(refreshToken);
      setCookie("access_token", newAccessToken, 10);
      console.log("Token refreshed successfully.");
    } catch (error) {
      // Xử lý lỗi khi làm mới token
    }
  } else {
    // Người dùng đã đăng xuất hoặc không có refresh token
    clearInterval(tokenRefreshInterval);
  }
};

function App() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const accessToken = getCookie("access_token");
      if (!accessToken) {
        // Thực hiện hành động khi access_token mất đi, ví dụ: đăng xuất hoặc làm mới token.
        checkAndRefreshToken();
        console.log("Access token is missing. Perform actions here.");
      }
    };

    document.addEventListener("load", function () {
      const accessToken = getCookie("access_token");
      if (!accessToken) {
        // Thực hiện hành động khi access_token mất đi, ví dụ: đăng xuất hoặc làm mới token.
        checkAndRefreshToken();
        console.log("Access token is missing. Perform actions here.");
      }
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return (
    <div className="App bg-light-silver h-full">
      <Router></Router>
    </div>
  );
}

export default App;
