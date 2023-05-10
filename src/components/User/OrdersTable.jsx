import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button, message, Popconfirm } from "antd";
import { useSelector } from "react-redux";


const Container = styled.div`
.phone:hover{
  color: #b61010;
  cursor: pointer;
}
`;

const Users = styled.div`
display: flex;
`;
const User = styled.div`
  flex: 1;
  font-size: 14px;
  margin-right: 20px;
  margin-bottom: 10px;
  span {
    font-size: 16px;
    font-weight: 600;
    padding-left: 10px;
    color: #940707;
  }
`;

const Product = styled.div`
  /* display: flex; */
  margin-top: 10px;
`;
const Status = styled.div`
  text-align: center;
  color: red;
  border-bottom: 1px dotted #898989;
`;
const Table = styled.table`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead {
    background-color: #f2f2f2;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
  p {
    font-size: 13px;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  img {
    max-width: 50px;
  }
`;

const ButtonDelete = styled(Button)`
  border: 1px solid aliceblue;
  &:hover {
    background-color: #b00000;
    color: #ffffff1e;
  }
`;

function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/newOrders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.log(error));
  }, []);

  const { address, phone, name } = useSelector((state) => state.auth);

const handleDeleteOrder = (id) => {
  axios
    .delete(`http://localhost:3001/newOrders/${id}`)
    .then(() => {
      const filteredOrders = orders.filter((order) => order.id !== id);
      setOrders(filteredOrders);
      window.location.reload();
    })
    .catch((error) => console.log(error));
};
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
            Tên khách hàng: <span>{name}</span>
          </User>
          <User>
            Số điện thoại: <span>{phone}</span>
          </User>
          <User>
            Địa chỉ: <span>{address}</span>
          </User>
        </Users>

        <Table>
          <table>
            <thead>
              <tr>
                <th>Tổng đơn hàng đã đặt</th>
                <th>Tổng tiền đơn hàng</th>
                <th>Tổng số lượng đơn hàng</th>
                <th>
                  Tổng tiền
                  <p>
                    (Thanh toán khi nhận hàng bao gồm phí ship và đã trừ đi
                    voucher)
                  </p>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th>Tên</th>
                          <th>Sản phẩm</th>
                          <th>Giá gốc</th>
                          <th>Số lượng</th>
                          <th>Tổng tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.seItems.selectedItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.productName}</td>
                            <td>
                              <img src={item.imgUrl} alt="" />
                            </td>
                            <td>{item.price.toLocaleString()}₫</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice.toLocaleString()}₫</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>{order.seItems.selectedTotalAmount.toLocaleString()}₫</td>
                  <td>{order.seItems.selectedQuantity}</td>
                  <td>{order.seItems.price}₫</td>
                  <td>
                    <Popconfirm
                      title="Bạn có chắc sẽ hủy đơn hàng"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText={
                        <h6 onClick={() => handleDeleteOrder(order.id)}>Có</h6>
                      }
                      cancelText={<h6>Không</h6>}
                    >
                      <ButtonDelete type="link">Hủy đơn hàng</ButtonDelete>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Product>
      {orders && (
        <div className="status">
          <Status>Đơn hàng của bạn đang được vận chuyển</Status>
          <span className="complain">
            mọi thắc mắt xin liên hệ <i className="ri-phone-line"></i>{" "}
            <span className="phone">0313555248</span>
          </span>
        </div>
      )}
    </Container>
  );
}

export default OrdersTable;
