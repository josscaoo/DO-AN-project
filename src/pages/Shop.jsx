import React, { useState } from "react";

import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import "../styles/shop.css";

import products from "../assets/data/products";
import ProductLists from "../components/UI/Shop/ProductsList";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "iphone") {
      const filteredProducts = products.filter(
        (item) => item.category === "iphone"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "oppo") {
      const filteredProducts = products.filter(
        (item) => item.category === "oppo"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "samsung") {
      const filteredProducts = products.filter(
        (item) => item.category === "samsung"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "vivo") {
      const filteredProducts = products.filter(
        (item) => item.category === "vivo"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "realme") {
      const filteredProducts = products.filter(
        (item) => item.category === "realme"
      );
      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProductsData(searchedProducts);
  };

  return (
    <Helmet title="Shop">

      <div className="main__shop">
        <div className="body__shop">
          <Container>
            <Row>
              <Col lg="3" md="6">
                <div className="filter__widget">
                  <select onChange={handleFilter}>
                    <option>Lựa chọn</option>
                    <option value="iphone">Iphone</option>
                    <option value="oppo">Oppo</option>
                    <option value="samsung">Samsung</option>
                    <option value="vivo">Vivo</option>
                    <option value="realme">Realme</option>
                  </select>
                </div>
              </Col>
              <Col lg="3" md="6" className="text-end">
                <div className="filter__widget">
                  <select>
                    <option>Sắp xếp theo</option>
                    <option value="ascending">Tăng dần</option>
                    <option value="descending">Giảm dần</option>
                  </select>
                </div>
              </Col>
              <Col lg="6" md="12">
                <div className="search__box">
                  <input
                    type="text"
                    placeholder="Search....."
                    onChange={handleSearch}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="pt-0">
          <Container>
            <Row>
              {productsData.length === 0 ? (
                <h1 className="text-center fs-4">
                  Không có sản phẩm nào được tìm thấy!
                </h1>
              ) : (
                <ProductLists data={productsData} />
              )}
            </Row>
          </Container>
        </div>
      </div>
    </Helmet>
  );
};

export default Shop;
