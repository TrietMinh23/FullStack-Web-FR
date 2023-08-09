import "./App.css";
import Router from "./Router/router";
import getCookie from "./utils/getCookie";
import axios from "axios";
import setCookie from "./utils/setCookie";

let tokenRefreshInterval;

const refreshTokenHandle = async () => {
  const refreshToken = getCookie("refresh_token").replace(/^"(.*)"$/, "$1");

  if (!refreshToken) {
    console.error("No refresh token available.");
    return;
  }

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

    setCookie("access_token", newAccessToken, 10);

    console.log("Token refreshed successfully.");
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

const checkAndRefreshToken = () => {
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");

  if (!accessToken && refreshToken) {
    console.log("Hello");
    refreshTokenHandle();
  } else {
    // Người dùng đã đăng xuất hoặc không có refresh token
    clearInterval(tokenRefreshInterval);
  }
};

function App() {
  tokenRefreshInterval = setInterval(checkAndRefreshToken, 5000);
  return (
    <div className="App bg-light-silver">
      <Router></Router>
    </div>
  );
}

export default App;
