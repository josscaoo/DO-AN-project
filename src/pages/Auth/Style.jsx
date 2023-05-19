import styled from "styled-components";
import { Modal } from "antd";


export const Information = styled.form`
  background-color: #e9f4f9ce;
  width: 100%;
`;
export const User = styled.div`
  display: flex;
  padding-left: 20px;
  padding-bottom: 10px;
  span {
    padding-right: 10px;
    font-weight: 700;
    font-size: 17px;
    display: flex;
  }
  p {
    font-size: 15px;
    font-weight: 600;
    padding-right: 10px;
  }
  h6 {
    color: #0095ff;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 50px;
  }
  h6:hover {
    color: red;
  }
`;
export const Map = styled.div`
  margin: 20px 0;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 600;
  color: #ff6a00;
  i {
    color: red;
  }
`;
export const TableOder = styled.div`
  display: flex;
  margin-top: 10px;

  table {
    width: 80%;
  }
  thead {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #f5f5f5;
  }
  tr {
    @media (max-width: 1024px) {
      padding-left: 10px;
    }
    th {
      text-align: center;
      padding-left: 15px;
      padding-top: 10px;
    }
    td {
      cursor: pointer;
      color: var(--primary-color);
      vertical-align: bottom;
      h6 {
        font-size: 13px;
        margin-bottom: 5px;
        padding-top: 30px;
        text-align: center;
        margin-left: 15px;
        margin-bottom: 40px;
      }
      .image {
        text-align: center;
        margin: 10px;
      }
      img {
        width: 80px;
        height: 80px;
      }
    }
    th {
      padding-right: 10px;
    }
  }
`;
export const Table = styled.div`
  margin: auto;

  .quantity {
    font-size: 15px;
    font-weight: 500;
    display: flex;

    h6 {
      margin-left: 20px;
      font-size: 15px;
      font-weight: 500;
      margin-top: 3px;
    }
  }
  .value {
    display: flex;
    font-size: 15px;
    font-weight: 500;
    margin-right: 15px;
    flex: 1;

    h6 {
      margin-left: 20px;
      font-size: 15px;
      font-weight: 500;
      margin-top: 3px;
    }
  }
  .order__correction {
    color: #0095ff;
    cursor: pointer;
  }
  .order__correction:hover {
    color: red;
  }
`;

export const Note = styled.div`
  margin-top: 20px;
  display: flex;
  border: 1px;
  border-bottom: 1px dotted #898989;
  border-top: 1px dotted #898989;
  background-color: #e9f4f9ce;
`;
export const NoteText = styled.div`
  display: flex;
  border-right: 1px dotted #898989;
  h6 {
    padding-top: 22px;
    font-size: 15px;
    padding-left: 10px;
  }
  form {
    padding: 10px 10px;
    textarea {
      width: 200px;
      height: 40px;
    }
  }
`;
export const Transport = styled.div`
  margin-top: 10px;
  height: 80px;
  padding-top: 5px;
  padding-right: 10px;
  display: flex;
  .voucher {
    text-align: right;
    display: flex;
    width: 100%;

    .select__voucher {
      cursor: pointer;
      display: flex;
      .voucher__button {
        width: 220px;
        h6 {
          padding-top: 3px;
          font-size: 14px;
          text-align: center;
          padding-bottom: 5px;
        }

        button {
          border-left: 2px dotted #898989;
          border-right: 2px dotted #898989;
          background-color: #00aaff;
          width: 85px;
          height: 30px;
          margin-right: 65px;
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
    .text__transport {
      text-align: left;
    }
  }
`;

export const Total = styled.div`
  background-color: #e9f4f9ce;
  height: 40px;
  padding-top: 5px;
  padding-right: 10px;
  display: flex;

  .total__money {
    text-align: right;
    flex: 1;
    padding-right: 10px;
  }
  h6 {
    font-size: 18px;
    font-weight: 600;
    color: red;
  }
`;
export const Add = styled.div`
  margin-top: 10px;
  display: flex;
  .button__order {
    width: 20%;
    margin-left: 13rem;
  }
  button {
    margin: auto;
    background-color: rgb(255, 94, 0);
    border-radius: 2px;
    color: #ffffff;
    font-weight: 600;
    border: 1px;
    height: 40px;

    a:hover {
      color: white;
    }
  }

  button:hover {
    background-color: rgb(208, 77, 1);
    color: #e9e5e5;
  }
`;

export const Voucher = styled.div`
  margin-top: 10px;
  background-color: #dcf1f1;
  height: 100px;
  padding-top: 5px;
  padding-right: 10px;
  display: flex;
  .voucher {
    text-align: right;
    display: flex;
    width: 100%;
    .voucher__text {
      width: 400px;
      padding-top: 15px;
      font-size: 25px;
      font-weight: 600;
      text-shadow: 2px 2px 5px #ffbf00;
      color: #8b1616;
      padding-right: 10px;
    }

    .select__voucher {
      background-color: #dcf1f1;
      cursor: pointer;
      display: flex;
      .voucher__button {
        width: 200px;
        display: flex;
        padding-top: 20px;
        padding-left: 30px;
        p {
          padding-top: 3px;
          padding-right: 5px;
        }

        button {
          border-left: 2px dotted #898989;
          border-right: 2px dotted #898989;
          margin-right: 10px;
          background-color: #ffbf00;
          width: 100px;
          height: 30px;
        }
      }
    }

    .voucher__content {
      width: 300px;
      padding-left: 10px;
      padding-top: 10px;
      text-align: left;
    }
  }
`;
export const Oder = styled.div`
  margin-top: 20px;
  .method {
    display: flex;
    height: 50px;
    border-bottom: 1px dotted #898989;
    h5 {
      flex: 1;
    }
    h6 {
      padding-left: 50px;
      padding-right: 10px;
      font-weight: bold;
      width: 700px;
    }
    ul {
      list-style: none;
      padding: 0;
      display: flex;
    }
    li {
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      margin-right: 5px;
      font-size: 17px;
      font-weight: 550;

      &:hover {
        background-color: #e9f4f9ce;
      }

      &.selected {
        span {
          font-weight: bold;
          color: #cf1111;
        }
      }

      span {
        display: flex;
        align-items: center;

        i {
          margin-right: 4px;
          color: green;
          font-weight: 600;
          font-size: 18px;
        }
      }
    }
  }
  .total__order {
    display: flex;
    height: 140px;
    border-bottom: 1px dotted #898989;
    background-color: #e9f4f9ce;

    .order__content {
      flex: 1;
      background-color: white;
      margin: 20px;
      padding: 10px;
    }
    .total__order__text {
      padding-top: 10px;
      padding-left: 70px;
      padding-right: 10px;
      .total__order__amount {
        font-size: 22px;
        font-weight: 600;
        color: red;
      }
    }
  }
  .total__money {
    display: flex;
    height: 50px;
    border-bottom: 1px dotted #898989;
    p {
      flex: 1;
    }
    .total__order__text {
      padding-top: 10px;
      padding-left: 70px;
      padding-right: 10px;
      .total__order__amount {
        font-size: 22px;
        font-weight: 600;
        color: red;
      }
    }
  }
`;
export const StyledModal = styled(Modal)`
  .img__qr img {
    width: 40%;
  }
  .ant-modal-close-x {
    display: none;
  }
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-content {
    height: 350px;
    width: 400px;
  }
  .total__order {
    display: flex;
    margin-top: 20px;
  }
  .total__order__text {
    flex: 1;
    text-align: left;
  }
  .total__order__number {
    color: red;
  }
  .total__order__all {
    font-size: 18px;
  }
  .total__order__amount {
    font-size: 18px;
    font-weight: 500;
  }
`;