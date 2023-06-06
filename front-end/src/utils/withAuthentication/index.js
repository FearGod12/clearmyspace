import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuthentication = (WrappedComponent) => {
  const WithAuthenticationWrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuthenticationWrapper;
};

export default withAuthentication;
