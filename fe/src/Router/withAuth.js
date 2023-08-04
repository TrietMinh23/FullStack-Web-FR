import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../utils/getCookie";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();

    // Kiểm tra xác thực ở đây (ví dụ: kiểm tra access_token)
    const isAuthenticated = getCookie("access_token");

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login"); // Điều hướng đến trang đăng nhập
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
