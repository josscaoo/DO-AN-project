import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import Helmet from "../components/Helmet/Helmet";
import ProductLists from "../components/UI/Shop/ProductsList";
import styled from "styled-components";

const Main = styled.div`
    margin-top: 30px;
`;
const Body = styled.div`
    padding: 5rem;
    display: flex;
`;
const Filter = styled.div`
 @media (max-width: 768px) {
    margin-bottom: 30px;
  }
   @media (max-width: 1024px) {
        margin-bottom: 30px;

  }
select{
    padding: 10px 20px;
    border: 1px solid rgba(156, 156, 35, 0.875);
    cursor: pointer;
    border-radius: 5px ;
    background: rgb(185, 7, 7);
    color: #fff;
     @media (max-width: 768px) {
    padding: 7px 20px;
    font-size: 0.9rem;
  }
   @media (max-width: 1024px) {
        padding: 7px 20px;
    font-size: 0.9rem;
  }
}
select:focus {
    outline: none !important;
}
select option {
    font-size: 0.9rem;
    color: white;
}
`;
const Search = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    cursor: pointer;
    input {
    width: 100%;
    border: none;
    outline: none;
    padding: 8px 10px;
    }
    span {
    color: white;
}
`;


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
      <Main>
        <Body>
          <Container>
            <Row>
              <Col lg="6" md="6">
                <Filter>
                  <select onChange={handleFilter}>
                    <option value="all">Tất cả sản phẩm</option>
                    <option value="iphone">Iphone</option>
                    <option value="oppo">Oppo</option>
                    <option value="samsung">Samsung</option>
                    <option value="vivo">Vivo</option>
                    <option value="realme">Realme</option>
                  </select>
                </Filter>
              </Col>
              <Col lg="6" md="12">
                <Search>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    onChange={handleSearch}
                  />
                </Search>
              </Col>
            </Row>
          </Container>
        </Body>
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
      </Main>
    </Helmet>
  );
};

export default Shop;