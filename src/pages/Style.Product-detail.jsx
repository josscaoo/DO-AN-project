import { Modal } from "antd";
import styled from "styled-components";

export const Image = styled.section`
  img {
    @media (max-width: 768px) {
      margin: auto;
      width: 60%;
      height: 100%;
    }
  }
  @media (max-width: 988px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
export const Detail = styled.section`
  padding-left: 50px;
  @media (max-width: 768px) {
  }
  h2 {
    font-size: 1.6rem;
    margin-top: 10px;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
  .Add__Cart {
  }
  button {
    background-color: rgb(241, 158, 49);
    color: black;
    font-weight: 600;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    border: 1px;
    margin-top: 5px;
    a:hover {
      background-color: rgb(184, 21, 21);
      color: white;
    }
  }
  button:hover {
    background-color: rgb(184, 21, 21);
    color: white;
  }
`;
export const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: red;
`;

export const DetailReview = styled.section`
padding-top: 0;
`;


export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  h6 {
    color: var(--primary-color);
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    padding-right:10px;
  }
  h6:hover{
    color: red;
  }
`;
export const Select = styled.h6`
  color: var(--primary-color);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  padding-right: 10px;
  :hover {
    color: red;
  }
  .active__tab {
    font-weight: 800;
  }
`;

export const Content = styled.div`
  margin-top: 5px;
`;

export const Review = styled.div`
  margin-top: 5px;
  display: flex;
  .hottelephone__sale{
    text-align: center;
  }
 
`;
export const ReviewWrapper = styled.div`
  width: 90%;
  #content {
    height: 21.5rem; 
    overflow: hidden;
  }

  .collapsed {
    height: auto !important;
  }
  #toggleBtn {
    margin: auto;
    width: 20%;
    cursor: pointer;
  }
  #toggleBtn:hover{
    color: #1900ff;
  } 
  li {
    display: flex;
    .review__form {
      padding: 10px;
      background-color: rgba(130, 130, 135, 0.182);
      margin: 5px;
      border-radius: 0 20px 20px 20px;
      
    }
  }
  .review__icon {
    margin-top: 20px;
    cursor: pointer;
  }
`;
export const ReviewImage = styled.div`
  border-radius: 5px;
  border: 1px solid #e66e6e9b;
  border-radius: 5px;
  h5 {
    font-weight: 600;
    color: #bb0b0b;
    font-size: 17px;
    width: 100%;
    height: 30px;
    background-color: #f7c5c5;
    padding: 5px 5px 0;
  }
`;
export const Promotion = styled.div`
  margin: 10px;
  p {
    font-weight: 400;
    color: black;
    padding-bottom: 10px;
    i {
      color: #bc0808;
      font-size: 20px;
    }
    span {
      font-size: 16px;
      font-weight: 550;
      color: #bc0808;
    }
  }
  h6 {
    line-height: 1.8;
    font-weight: 550;
    span {
      font-size: 30px;
      color: #ce0909;
    }
    li {
      font-weight: 400;
      span {
        font-size: 17px;
        font-weight: 550;
      }
    }
    p {
      font-weight: 400;
      color: black;
    }
  }
`;
export const Service = styled.div`
  border-radius: 5px;
  border: 1px solid #2c9b90d7;
  border-radius: 5px;
  h5 {
    font-weight: 600;
    color: #fff;
    font-size: 17px;
    width: 100%;
    height: 30px;
    background-color: #18ab90d4;
    padding: 5px 5px 0;
  }
`;

export const FormGroup = styled.div`
  span {
    display: flex;
    align-items: center;
    column-gap: 5px;
    color: coral;
    font-weight: 600;
    cursor: pointer;
  }
  textarea {
    width: 100%;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    padding: 8px 20px;
  }
  input {
    width: 100%;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    padding: 8px 20px;
  }
  textarea:focus {
    outline: none;
  }
  input:focus {
    outline: none;
  }
  button {
    background-color: rgb(241, 158, 49);
    color: black;
    font-weight: 600;
    border-radius: 10px;
    width: 100px;
    height: 25px;
    border: 1px;

    a:hover {
      background-color: rgb(184, 21, 21);
      color: white;
    }
  }
  button:hover {
    background-color: rgb(184, 21, 21);
    color: white;
  }
`;

export const UserName = styled.div`
  font-size: 15px;
  font-weight: 600;
`;
export const TextReview = styled.div`
font-size: 13px;
  margin-left: 10px;
`;


export const EditReview = styled.div`
  display: flex;
  background-color: #d8d2e9a0;
  border: 1px solid black;
  border-radius: 0 5px 5px 5px;
  i {
    padding-left: 10px;
  }
  i:hover {
    color: brown;
    font-size: 15px;
    font-weight: 600;
  }
`;

export const ReviewForm = styled.section`
  width: 50%;
  padding-top: 0;
  padding-bottom: 0;
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 30px;
  }
  button {
    background-color: rgb(241, 158, 49);
    color: black;
    font-weight: 500;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    border: 1px;
    margin-left: 65%;

    a:hover {
      background-color: rgb(184, 21, 21);
      color: white;
    }
  }
  button:hover {
    background-color: rgb(184, 21, 21);
    color: white;
  }
`;


export const Related = styled.section`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 30px;
`;

export const StyledModal = styled(Modal)`
  .ant-btn-primary {
    background-color: red;
  }
  .ant-modal-footer {
    margin: auto;
    width: 50%;
    display: flex;
  }
  .ant-modal-content {
    height: 150px;
    width: 300px;
  }
  .ant-modal-close {
    flex: none;
  }
  .ant-modal-body {
    display: flex;
    justify-content: center;
    margin: 10px;
    margin-bottom: 30px;
  }
  .ant-btn-default {
    background-color: red;
    border-color: red;
    color: white;
    margin: auto;
  }
  .ant-btn-default:hover{
    background-color: #da0206;
  } .ant-btn-default:hover,
  .ant-btn-default:focus {
    background-color: white;
    color: black;
  }
  .ant-modal-close-x {
    display: none;
  }
`;