import React from "react";
import TabletCard from "./TabletCard";
const TabletList = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <TabletCard item={item} key={index} />
      ))}
    </>
  );
};

export default TabletList;
