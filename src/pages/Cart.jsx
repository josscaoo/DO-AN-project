import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/Ul/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state=> state.cart.totalAmount)
  
  return (
    <Helmet title="Cart">
      <CommonSection title="" />
      <div className="cart__main">
        <div className="cart__body">
          <section>
            <Container>
              <Row>
                <Col lg="9">
                  {cartItems.length === 0 ? (
                    <h2 className="fs-4 text-center">
                      Không có mặt hàng nào được thêm vào giỏ hàng
                    </h2>
                  ) : (
                    <table className="table bordered">
                      <thead>
                        <tr>
                          <th>Hình ảnh</th>
                          <th>Tên sản phẩm </th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Xóa</th>
                          <th>thêm</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cartItems.map((item, index) => (
                          <Tr item={item} key={index} />
                        ))}
                      </tbody>
                    </table>
                  )}
                </Col>
                <Col lg="3">
                  <div>
                    <h6 className="d-flex align-items-center justify-content-between ">
                      Tổng tiền:
                      <span className="fs-4 fw-bold">{totalAmount}VND</span>
                    </h6>
                  </div>
                  <p className="fs-6 mt-2">
                    thuế và phí vận chuyển sẽ được tính khi thanh toán
                  </p>
                  <div className="cart__button">
                    <button className="buy__btn w-100 ">
                      <Link to="/information">
                        Thanh Toán
                      </Link>
                    </button>
                    <button className="buy__btn w-100 mt-3">
                      <Link to="/shop">Tiếp Tục Mua Hàng</Link>
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </Helmet>
  );
};


const Tr = ({ item }) => {
  const dispatch = useDispatch()
  
  const {
    imgUrl,
    productName,
    price,
  } = item;



  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }
  const addProduct = () => {
    dispatch(cartActions.incrementItem(item.id))
  }

  return (
    <tr>
      <td>
        <img src={imgUrl} alt="" />
      </td>
      <td>{productName}</td>
      <td>{price}VND</td>
      <td>{item.quantity} sản phẩm</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-subtract-line"
        ></motion.i>
      </td>
      <td>
        <motion.i onClick={addProduct} class="ri-add-line"></motion.i>
      </td>
    </tr>
  );
};


export default Cart