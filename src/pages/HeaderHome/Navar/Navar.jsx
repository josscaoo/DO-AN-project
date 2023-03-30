import React, { useState } from "react";
import { useNavigate } from "react-router";
import{Container, ListMenu, ListOther, ListPhone} from './Style'

const Navar = () => {
    const [showIphone, setShowIphone] = useState(false);
    const [showSamSung, setShowSamSung] = useState(false);
    const [showXiaomi, setShowXiaomi] = useState(false);
    const [showOppo, setShowOppo] = useState(false);

  const toggleIphone = () => {
    setShowIphone(!showIphone);
    };
    const toggleSamSung = () => {
      setShowSamSung(!showSamSung);
    };
    const toggleOppo = () => {
      setShowOppo(!showOppo);
    };
    const toggleXiaomi = () => {
      setShowXiaomi(!showXiaomi);
    };

    const navigate = useNavigate();

    const navigateToIphone14MV = () => {
      navigate("/shop/6");
    };
    const navigateToIphone14T = () => {
      navigate("/shop/5");
    };
    const navigateToIphone13T = () => {
      navigate("/shop/3");
    };
    const navigateToIphone11X = () => {
      navigate("/shop/2");
    };
    const navigateToIphone14V = () => {
      navigate("/shop/1");
    };
    const navigateToIphone14D = () => {
      navigate("/shop/7");
    };
    const navigateToIphone13H = () => {
      navigate("/shop/18");
    };

    const navigateToSamSung1 = () => {
      navigate("/shop/27");
    };
    const navigateToSamSung2 = () => {
      navigate("/shop/8");
    };
    const navigateToSamSung3 = () => {
      navigate("/shop/9");
    };
    const navigateToSamSung4 = () => {
      navigate("/shop/1");
    };

    const navigateToOppo1 = () => {
      navigate("/shop/25");
    };
    const navigateToOppo2 = () => {
      navigate("/shop/11");
    };
    const navigateToOppo4 = () => {
      navigate("/shop/13");
    };
    const navigateToOppo5 = () => {
      navigate("/shop/14");
    };
    const navigateToOppo6 = () => {
      navigate("/shop/15");
    };

     const navigateToOther1 = () => {
       navigate("/shop/16");
     };
     const navigateToOther2 = () => {
       navigate("/shop/17");
     };
     const navigateToOther4 = () => {
       navigate("/shop/19");
     };
     const navigateToOther5 = () => {
       navigate("/shop/2");
     };

    return (
      <Container>
        <ListPhone onMouseEnter={toggleIphone} onMouseLeave={toggleIphone}>
          <span >Iphone</span>
          {showIphone && (
            <ListMenu>
              <ul>
                <li onClick={navigateToIphone14D}>  iPhone 14 Pro Max 128GB Đen </li>
                <li onClick={navigateToIphone14MV}> iPhone 14 Pro Max 128GB Vàng </li>
                <li onClick={navigateToIphone14T}> iPhone 14 Pro Max 64GB Tím </li>
                <li onClick={navigateToIphone13T}>iPhone X 64GB Trắng</li>
              </ul>
              <ul>
                <li onClick={navigateToIphone13H}> iPhone 14 Pro Max 128GB Hồng </li>
                <li onClick={navigateToIphone14V}> iPhone 14 Pro Max 128GB Vàng </li>
                <li onClick={navigateToIphone11X}>iPhone 11 64GB Xanh Ngọc</li>
              </ul>
            </ListMenu>
          )}
        </ListPhone>

        <ListPhone  onMouseEnter={toggleSamSung}  onMouseLeave={toggleSamSung} >
          <span >SamSung</span>
          {showSamSung && (
            <ListMenu>
              <ul>
                <li onClick={navigateToSamSung1}>Samsung Galaxy S22 Đen</li>
                <li onClick={navigateToSamSung2}>Samsung Galaxy S22 Trắng</li>
                <li onClick={navigateToSamSung4}>Samsung Galaxy A52 Xanh</li>
              </ul>
              <ul>
                <li onClick={navigateToSamSung4}>Samsung Galaxy A92 </li>
                <li onClick={navigateToSamSung3}>Samsung Galaxy Note 2</li>
              </ul>
            </ListMenu>
          )}
        </ListPhone>

        <ListPhone onMouseEnter={toggleXiaomi} onMouseLeave={toggleXiaomi} >
          <span >Oppo</span>
          {showXiaomi && (
            <ListMenu>
              <ul>
                <li onClick={navigateToOppo1}>Oppo Reno6 5G (8+128GB)</li>
                <li onClick={navigateToOppo2}>OPPO A15 3GB 32GB</li>
                <li onClick={navigateToOppo4}>OPPO Reno7 5G</li>
                <li onClick={navigateToOppo5}>ĐIỆN THOẠI OPPO A16K</li>
              </ul>
              <ul>
                <li onClick={navigateToOppo6}>OPPO A17K</li>
              </ul>
            </ListMenu>
          )}
        </ListPhone>

        <ListPhone onMouseEnter={toggleOppo} onMouseLeave={toggleOppo} >
          <span >Vivo</span>
          {showOppo && (
            <ListOther>
              <ul>
                <li onClick={navigateToOther1}>Vivo Y2 </li>
                <li onClick={navigateToOther2}>Vivo T1x</li>
                <li onClick={navigateToOther4}>Realme C33 </li>
                <li onClick={navigateToOther5}>Realme TX54</li>
              </ul>
            </ListOther>
          )}
        </ListPhone>
      </Container>
    );
};

export default Navar;
