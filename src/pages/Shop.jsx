import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import Helmet from "../components/Helmet/Helmet";
import ProductLists from "../components/UI/Shop/ProductsList";
import "../styles/shop.css";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:3001/products");
      setAllProducts(result.data);
      setFilteredProducts(result.data);
    }
    fetchData();
  }, []);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "all") {
      setFilteredProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (item) => item.category === filterValue
      );
      setFilteredProducts(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchedProducts = allProducts.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchTerm) &&
        (filteredProducts.length === 0 ||
          item.category === filteredProducts[0].category)
    );
    setFilteredProducts(searchedProducts);
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
                    <option value="all">Tất cả sản phẩm</option>
                    <option value="iphone">Iphone</option>
                    <option value="oppo">Oppo</option>
                    <option value="samsung">Samsung</option>
                    <option value="vivo">Vivo</option>
                    <option value="realme">Realme</option>
                  </select>
                </div>
              </Col>
              <Col lg="3" md="6" className="text-end">
                <div className="filter__widget"></div>
              </Col>
              <Col lg="6" md="12">
                <div className="search__box">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
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
              {filteredProducts.length === 0 ? (
                <h1 className="text-center fs-4">
                  Không có sản phẩm nào được tìm thấy!
                </h1>
              ) : (
                <ProductLists data={filteredProducts} />
              )}
            </Row>
          </Container>
        </div>
      </div>
    </Helmet>
  );
};

export default Shop;