import React from "react";
import CardSale from "./CardSale";
const ProductsList = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <CardSale item={item} key={index} />
      ))}
    </>
  );
};

export default ProductsList;
