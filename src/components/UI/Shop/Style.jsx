import styled from "styled-components";
import { Modal } from "antd";


export const Container = styled.div`
  cursor: pointer;
  border: 1px solid rgba(103, 103, 110, 0.221);
  border-radius: 5px;
  height: 360px;
  width: 287px;
  background-color: white;
  &:hover {
    box-shadow: 0 0 10px 5px rgba(103, 103, 110, 0.5);
    border-color: rgba(0, 0, 24, 0.2);
  }
  @media (max-width: 1024px) {
    width: 230px;
    height: 345px;
  }
  @media (max-width: 425px) {
    margin: auto;
    width: 80%;
  }
`;

export const Images = styled.div`
  width: 200px;
  height: 200px;
  margin: auto;
  margin-top: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1024px) {

  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

export const Info = styled.div`
  margin: 0 15px;
  @media (max-width: 425px) {
    display: flex;
  }

  h6 {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 15px;
    color: var(--primary-color);
    height: 50px;

    a {
      &:hover {
        color: #a64747;
      }
    }

    @media (max-width: 992px) {
      font-size: 1rem;
    }

    @media (max-width: 1024px) {
      font-size: 13px;
    }

    @media (max-width: 768px) {
      font-size: 10px;
    }
    @media (max-width: 425px) {
      font-size: 13px;
    }
  }

  span {
    font-size: 0.9rem;
    @media (max-width: 425px) {
      font-size: 13px;
    }
  }
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
   .ant-btn-default:hover {
     background-color: #da0206;
   }
   .ant-btn-default:hover,
   .ant-btn-default:focus {
     background-color: white;
     color: black;
   }
   .ant-modal-close-x {
     display: none;
   }
 `;


export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  color: black;
  margin: 0 15px;

  h4 {
    font-size: 1rem;
    font-weight: 550;
    color: #940707;

    @media (max-width: 1024px) {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }

  span {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;

    i {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      color: #fff;
      background: #940707;

      @media (max-width: 1024px) {
        font-size: 10px;
      }

      @media (max-width: 768px) {
        font-size: 10px;
      }
    }


    @media (max-width: 1024px) {
      font-size: 15px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  
`;
