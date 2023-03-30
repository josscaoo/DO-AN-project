import React from 'react';

import Helmet from '../components/Helmet/Helmet';
import "../styles/home.css";


import PromotionTop from './HeaderHome/Promotion/PromotionTop';
import SaleDays from './MainHome/SaleDays/SaleDays';
import sale from "../assets/images/anhsale-08.webp";
import Service from "./MainHome/Service/Service";
import Popular from "./MainHome/Popular/Popular";
import Advertise from "./MainHome/Advertise/Advertise";
import SoundProduct from "./MainHome/Sound/SoundProduct";
import MainProduct from './MainHome/HeaderMenu/MainProduct';
import Navar from './HeaderHome/Navar/Navar';

const Home = () => {


  return (
    <Helmet title={"Home"}>
      <div className='home__pages'>
        <Navar/>
        <PromotionTop />
        <SaleDays />
        <div className="img__sale">
          <img src={sale} alt="img" />
        </div>

        <Service />
        <Popular />
        <Advertise />
        <MainProduct />
        <SoundProduct />
      </div>
    </Helmet>
  );
}

export default Home