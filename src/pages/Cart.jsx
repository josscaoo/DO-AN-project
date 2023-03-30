import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const addLogin = () => {
    toast.error("Bạn Cần Đăng Nhập Để Mua Hàng");
  };

  return (
    <Helmet title="Cart">
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
                    <h6 className=" d-flex align-items-center justify-content-between ">
                      Tổng tiền:
                      <span className=" fs-4 fw-bold">
                        {totalAmount.toLocaleString("vi-VN")}VND
                      </span>
                    </h6>
                  </div>
                  <p className="fs-6 mt-2">
                    thuế và phí vận chuyển sẽ được tính khi thanh toán
                  </p>
                  <div className="cart__button">
                    {isLoggedIn ? (
                      <div>
                        <button className="buy__btn w-100 ">
                          <Link to="/information">Thanh Toán</Link>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="buy__btn w-100 "
                          onClick={addLogin}
                        >
                          Thanh Toán
                        </button>
                      </div>
                    )}

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
  const dispatch = useDispatch();

  const { imgUrl, productName, price } = item;

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  const addProduct = () => {
    dispatch(cartActions.incrementItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={imgUrl} alt="" />
      </td>
      <td>{productName}</td>
      <td>{price.toLocaleString("vi-VN")}VND</td>
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

export default Cart;




// import React, { useEffect, useState } from "react";
// import { Container, Row, Col } from "reactstrap";
// import axios from "axios";

// import Helmet from "../components/Helmet/Helmet";
// import ProductLists from "../components/UI/Shop/ProductsList";
// import "../styles/shop.css";

// const Shop = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const result = await axios.get("http://localhost:3001/products");
//       setAllProducts(result.data);
//       setFilteredProducts(result.data);
//     }
//     fetchData();
//   }, []);

//   const handleFilter = (e) => {
//     const filterValue = e.target.value;
//     if (filterValue === "all") {
//       setFilteredProducts(allProducts);
//     } else {
//       const filteredProducts = allProducts.filter(
//         (item) => item.category === filterValue
//       );
//       setFilteredProducts(filteredProducts);
//     }
//   };

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value;
//     const searchedProducts = allProducts.filter((item) =>
//       item.productName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(searchedProducts);
//   };

//   return (
//     <Helmet title="Shop">
//       <div className="main__shop">
//         <div className="body__shop">
//           <Container>
//             <Row>
//               <Col lg="3" md="6">
//                 <div className="filter__widget">
//                   <select onChange={handleFilter}>
//                     <option value="all">Tất cả sản phẩm</option>
//                     <option value="iphone">Iphone</option>
//                     <option value="oppo">Oppo</option>
//                     <option value="samsung">Samsung</option>
//                     <option value="vivo">Vivo</option>
//                     <option value="realme">Realme</option>
//                   </select>
//                 </div>
//               </Col>
//               <Col lg="3" md="6" className="text-end">
//                 <div className="filter__widget"></div>
//               </Col>
//               <Col lg="6" md="12">
//                 <div className="search__box">
//                   <input
//                     type="text"
//                     placeholder="Tìm kiếm sản phẩm"
//                     onChange={handleSearch}
//                   />
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </div>

//         <div className="pt-0">
//           <Container>
//             <Row>
//               {filteredProducts.length === 0 ? (
//                 <h1 className="text-center fs-4">
//                   Không có sản phẩm nào được tìm thấy!
//                 </h1>
//               ) : (
//                 <ProductLists data={filteredProducts} />
//               )}
//             </Row>
//           </Container>
//         </div>
//       </div>
//     </Helmet>
//   );
// };

// export default Shop;
