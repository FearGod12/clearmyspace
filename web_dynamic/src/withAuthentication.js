import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {
  const WithAuthenticationWrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        navigate('/login'); // Redirect to login page if token doesn't exist
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuthenticationWrapper;
};

export default withAuthentication;
