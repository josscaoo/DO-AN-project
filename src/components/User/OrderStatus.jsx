import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button, message, Popconfirm } from "antd";


const Container = styled.div``;
const Main = styled.div`
  h4 {
    text-align: center;
  }
  p{
    text-align: center;
  }
`;

const Users = styled.div`
`;
const User = styled.div`
display: flex;
font-size: 14px;
h6{
  font-size: 15px;
  padding-left: 10px;
}
`;
const Total = styled.div`
  margin-top: 20px;
  font-size: 14px;
  p {
    font-size: 13px;
    color: #ff7300;
  }
`;
const NumberTotal = styled.div`
font-size: 20px;
font-weight: 600;
color: #e90000;
`;
const Product = styled.div`
display: flex;
margin-top: 10px;
`;
const Table = styled.table`
margin-left: 10px;
width: 55rem;
background-color: aliceblue;
  tr {
    @media (max-width: 1024px) {
      padding-left: 10px;
    }
    td {
      padding-top: 10px;
      padding-right: 40px;
      padding-bottom: 15px;
      cursor: pointer;
      color: var(--primary-color);
      border-bottom: 1px solid rgb(133, 129, 129);

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
      }
    }
    th {
      padding-right: 10px;
    }
  }
`;
const Amount = styled.div``;
const Quantity = styled.div``;
const Status = styled.div`
  text-align: center;
  color: red;
  border-bottom: 1px dotted #898989;
`;
const ButtonDelete = styled(Button)`
  background-color: #afc7db;
  border: 1px solid aliceblue;
  color: #0073d7;
  &:hover {
    background-color: #b00000;
    color: white;
  }
`;

const OrderStatus = () => {
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/orders?_sort=id&_order=desc&_limit=1"
        );
        setLatestOrder(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestOrder();
  }, []);
  

  return (
    <Main>
      <h4>Đơn Hàng Của Bạn</h4>
      {latestOrder ? (
        <OrderDetails order={latestOrder} />
      ) : (
        <p>Bạn không có đươn hàng nào  ...</p>
      )}
    </Main>
  );
};

const OrderDetails = ({ order }) => {
  const { address, phone } = useSelector((state) => state.auth);
  const [showDetails, setShowDetails] = useState(true);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/orders/${order.id}`);
      toast.success("Đơn hàng đã bị xóa!");
      setShowDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!showDetails) {
      window.location.reload();
    }
  }, [showDetails]);
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <Container>
      <Product>
        <Users>
          <User>
            Tên khách hàng: <h6>{order.selectedUserName}</h6>
          </User>
          <User>
            Số điện thoại: <h6>{phone}</h6>
          </User>
          <User>
            Địa chỉ: <h6>{address}</h6>
          </User>
          <Total>
            <Amount>
              Chờ Thanh toán:
              <NumberTotal>
                {order.selectedTotalAmount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </NumberTotal>
            </Amount>
            <Quantity>số lượng: {order.selectedQuantity}</Quantity>
            <p> Đơn hàng chưa tính phí vận chuyển</p>
            <Popconfirm
              title="Bạn có chắc sẽ hủy đơn hàng"
              onConfirm={confirm}
              onCancel={cancel}
              okText={<h6 onClick={handleDelete}>Có</h6>}
              cancelText={<h6>Không</h6>}
            >
              <ButtonDelete type="link">
               Hủy đơn hàng
              </ButtonDelete>
            </Popconfirm>
          </Total>
        </Users>
        <Table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {showDetails &&
              order.selectedItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.imgUrl} alt="" />
                  </td>
                  <td>{item.productName}</td>
                  <td>
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Product>

      {showDetails && (
        <div>
          <Status>Đơn hàng của bạn đang được vận chuyển</Status>
        </div>
      )}
    </Container>
  );
};



export default OrderStatus;
