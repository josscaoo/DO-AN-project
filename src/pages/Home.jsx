import React from 'react';

import Helmet from '../components/Helmet/Helmet';
import "../styles/home.css";


import PromotionTop from './HeaderHome/Promotion/PromotionTop';
import sale from "../assets/images/anhsale-08.webp";
import Navar from './HeaderHome/Navar/Navar';
import SaleDays from './MainHome/SaleDays';
import OtherPhone from './MainHome/OtherPhone';
import Trademark from './MainHome/Trademark';
import NewPhone from './MainHome/NewPhone';
import GoodPhone from './MainHome/GoodPhone';
import Service from './MainHome/Service';

const Home = () => {


  return (
    <Helmet title={"Home"}>
      <div className='home__pages'>
        <Navar/>
        <PromotionTop />
        <SaleDays/>
        <div className="img__sale">
          <img src={sale} alt="img" />
        </div>
        <NewPhone />
        <Trademark/>
        <Service/>
        <GoodPhone />
        <OtherPhone />


      </div>
    </Helmet>
  );
}

export default Home