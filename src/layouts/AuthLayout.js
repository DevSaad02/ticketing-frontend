import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  useEffect(() => {
    // Add classes when component mounts
    document.body.classList.add('hold-transition', 'login-page', 'register-page');

    // Remove classes when component unmounts
    return () => {
      document.body.classList.remove('hold-transition', 'login-page', 'register-page');
    };
  }, []);

  return <Outlet />;
};

export default AuthLayout; 