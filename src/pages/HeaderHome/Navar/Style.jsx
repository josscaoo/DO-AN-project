import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: auto;
  width: 50%;
  height: 35px;
`;
export const ListPhone = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 50%;
  text-align: center;
  span{
    font-weight: 600;
  }
`;
export const ListMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 400px;
  display: flex;
  padding-bottom: 10px;
  li {
    display: flex;
    padding: 5px;
    font-size: 13px;
    font-weight: 500;
    padding-bottom: 7px;
  }
  li:hover {
    color: red;
  }
  li:last-child {
    border-bottom: none;
  }
`;
export const ListOther = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 160px;
  display: flex;
  padding-bottom: 10px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  li {
    padding-bottom: 7px;
  }
  li:hover {
    color: red;
  }
`;
