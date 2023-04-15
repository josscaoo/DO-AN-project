import React from 'react';
import Helmet from '../components/Helmet/Helmet';

import PromotionTop from './HeaderHome/PromotionTop';
import sale from "../assets/images/anhsale-08.webp";
import Navar from './HeaderHome/Navar';
import SaleDays from './ListProducts/SaleDays';
import OtherPhone from './ListProducts/OtherPhone';
import Trademark from './ListProducts/Trademark';
import NewPhone from './ListProducts/NewPhone';
import GoodPhone from './ListProducts/GoodPhone';
import Service from './ListProducts/Service';



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