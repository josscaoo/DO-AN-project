import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';

import { useLocation } from 'react-router-dom';
import Container from '../Container/Container';

const Layout = () => {

  const location = useLocation()

  return (
    <>
      {location.pathname.startsWith("/register") ||
      location.pathname.startsWith("/login") ? (
        ""
      ) : (
        <Header />
      )}

      <div>
        <Container>
          <Routers />
        </Container>
      </div>
      {location.pathname.startsWith("/register") ||
      location.pathname.startsWith("/login") ? (
        ""
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Layout