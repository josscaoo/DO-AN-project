import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';

import { useLocation } from 'react-router-dom';

const Layout = () => {

  const location = useLocation()

  return (
    <>
      {location.pathname.startsWith("/signup") ||
      location.pathname.startsWith("/login") ? (
        ""
      ) : (
        <Header />
      )}

      <div>
        <Routers />
      </div>
      {location.pathname.startsWith("/signup") ||
      location.pathname.startsWith("/login") ? (
        ""
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Layout