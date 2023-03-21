import React from 'react';

import Helmet from '../components/Helmet/Helmet';
import "../styles/home.css";


import PromotionTop from './Promotion/PromotionTop';
import SaleDays from './SaleDays/SaleDays';
import sale from "../assets/images/anhsale-08.webp";
import Service from './Service/Service';
import Popular from './Popular/Popular';
import Advertise from './Advertise/Advertise';
import MainProduct from './HeaderMenu/MainProduct';
import SoundProduct from './Sound/SoundProduct';
import Navar from '../components/Navar/Navar';

const Home = () => {


  return (
    <Helmet title={"Home"}>
      <div className='home__pages'>
        <Navar />
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