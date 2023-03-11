import React from "react";
import CardPhone from "./CardPhone";
const ListPhone = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <CardPhone item={item} key={index} />
      ))}
    </>
  );
};

export default ListPhone;
