import React, {useState, useEffect} from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import products from "../assets/data/products"

import Helmet from '../components/Helmet/Helmet';
import "../styles/home.css";

import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/iphone-0.png';

// import Services from '../services/Services';
import ProductsList from '../components/Ul/ProductsList';

import Clock from '../components/Ul/Clock';

import counterImg from '../assets/images/oppo-00.png';
import PromotionTop from './Promotion/PromotionTop';
import SaleDays from './SaleDays/SaleDays';
import sale from "../assets/images/anhsale-08.webp";
import Service from './Service/Service';
import Popular from './Popular/Popular';
import Advertise from './Advertise/Advertise';
import MainProduct from './HeaderMenu/MainProduct';
import SoundProduct from './Sound/SoundProduct';
import Navar from '../components/Navar/Navar';

// import useGetData from '../custom-hooks/useGetData';

const Home = () => {

  // const { data: products, loading } = useGetData('products');
  
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);


  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === 'samsung'
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "iphone"
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === "oppo"
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "vivo"
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === "realme"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, []);

  return (
    <Helmet title={"Home"}>
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
      <SoundProduct/>
    </Helmet>
  );
}

export default Home