
import React, {useState, useRef, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import products from "../assets/data/products"
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/Ul/CommonSection';
import { motion } from 'framer-motion';
import ProductsList from '../components/Ul/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from "react-toastify";


import '../styles/product-detail.css';

const ProductDetails = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [tab, setTab] = useState('desc');
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch()

  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const product = products.find(item => item.id === id);


  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category } = product;

  const relatedProducts = products.filter(item => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault()

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    
    if (isLoggedIn) {
      console.log(reviewObj);
      toast.success("Đã đánh giá");
    } else {
      toast.error("Bạn cần đăng nhập");
    }
    
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: id,
        productName: productName,
        price: price,
        imgUrl: imgUrl
      })
    );

    toast.success("Đã thêm vào giỏ hàng")
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection />
      <div className="main__detail">
        <div className="body__detail">
          <section className="pt-0">
            <Container>
              <Row>
                <Col lg="6">
                  <div className="img__detail">
                    <img src={imgUrl} alt="" />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="product__details">
                    <h2>{productName}</h2>
                    <div className="product__rating d-flex align-items-center gap-5 mb-3 ">
                      <div>
                        <span>
                          <i class="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i class="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i class="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i class="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i class="ri-star-half-line"></i>
                        </span>
                      </div>

                      <p>
                        (<span>{avgRating}</span> Rating)
                      </p>
                    </div>

                    <div d-flex align-items-center gap-5>
                      <span className="product__price">{price}VND</span>
                      <br />
                      <span>Mặt hàng:{category}</span>
                    </div>
                    <p className="mt-3">{shortDesc}</p>

                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      className="buy__btn"
                      onClick={addToCart}
                    >
                      Thêm vào giỏ hàng
                    </motion.button>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section>
            <Container>
              <Row>
                <Col lg="12">
                  <div className="tab__wrapper d-flex align-items-center gap-5">
                    <h6
                      className={`${tab === "desc" ? "active__tab" : ""}`}
                      onClick={() => setTab("desc")}
                    >
                      Mô tả
                    </h6>
                    <h6
                      className={`${tab === "rev" ? "active__tab" : ""}`}
                      onClick={() => setTab("rev")}
                    >
                      Nhận xét ({reviews.length})
                    </h6>
                  </div>

                  {tab === "desc" ? (
                    <div className="tap__content mt-5">
                      <p>{description}</p>
                    </div>
                  ) : (
                    <div className="product__review mt-5">
                      <div className="review__wapper">
                        

                        <div className="review__form">
                          <h4>Để lại ý kiến của bạn</h4>
                          <form action="" onSubmit={submitHandler}>
                            <div className="form__group">
                              <input
                                type="text"
                                placeholder="Nhập tên của bạn"
                                ref={reviewUser}
                                required
                              />
                            </div>

                            <div
                              className="form__group d-flex 
                          align-items-center gap-5 rating__group "
                            >
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(1)}
                              >
                                1<i class="ri-star-s-fill"></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(2)}
                              >
                                2<i class="ri-star-s-fill"></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(3)}
                              >
                                3<i class="ri-star-s-fill"></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(4)}
                              >
                                4<i class="ri-star-s-fill"></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(5)}
                              >
                                5<i class="ri-star-s-fill"></i>
                              </motion.span>
                            </div>

                            <div className="form__group">
                              <textarea
                                ref={reviewMsg}
                                rows={4}
                                type="text"
                                placeholder="Nội dung"
                                required
                              />
                            </div>

                            {isLoggedIn ? (
                              <div className='text__error'>
                                Bạn cần<p className="button__comment"> <Link to="/login"> Đăng nhập</Link> </p> để có thể bình luận sản phẩm
                              </div>
                            ) : (
                              <motion.button
                                // whileTap={{ scale: 1.2 }}
                                // type="submit"
                                // className="buy__btn"
                                onClick={() => setIsLoggedIn(false)}
                              >
                                Đánh giá
                              </motion.button>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </Col>

                <Col lg="12" className="mt-5">
                  <h2 className="related__title">Bạn có thể thích</h2>
                </Col>
                <ProductsList data={relatedProducts} />
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </Helmet>
  );
}

export default ProductDetails