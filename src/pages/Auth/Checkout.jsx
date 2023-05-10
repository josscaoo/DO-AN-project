import Helmet from "../../components/Helmet/Helmet";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import qr from "../../assets/images/QR.jpg";
import { toast } from "react-toastify";

const Information = styled.form`
  background-color: #e9f4f9ce;
  width: 100%;
`;
const User = styled.div`
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
const Map = styled.div`
  margin: 20px 0;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 600;
  color: #ff6a00;
  i {
    color: red;
  }
`;
const TableOder = styled.div`
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
const Table = styled.div`
  /* background-color: #b6d0e2; */
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

const Note = styled.div`
  margin-top: 20px;
  display: flex;
  border: 1px;
  border-bottom: 1px dotted #898989;
  border-top: 1px dotted #898989;
  background-color: #e9f4f9ce;
`;
const NoteText = styled.div`
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
const Transport = styled.div`
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

const Total = styled.div`
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
const Add = styled.div`
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

const Voucher = styled.div`
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
const Oder = styled.div`
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
const StyledModal = styled(Modal)`
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

const Checkout = () => {
  const { name, address, phone } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [latestSelectedQuantity, setLatestSelectedQuantity] = useState(0);
  const [latestSelectedTotalAmount, setLatestSelectedTotalAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(
    "thanh toán khi nhận hàng"
  );
  const [isQRScanned, setIsQRScanned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const delivery = ["thanh toán khi nhận hàng", "Quét mã QR"];
  const handleOptionSelect = (option) => {
    setSelectedDelivery(option);
    setIsQRScanned(option === "Quét mã QR");

    if (option === "Quét mã QR") {
      showModal();
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDiscountVoucher = (discount) => {
    if (selectedVoucher === null) {
      setPrice(price - discount);
      setSelectedVoucher(discount);
    } else if (selectedVoucher === discount) {
      setPrice(price + discount);
      setSelectedVoucher(null);
    }
  };

  const handleDiscountTransport = (discount) => {
    if (selectedTransport === null) {
      setPrice(price + discount);
      setSelectedTransport(discount);
    } else if (selectedTransport === discount) {
      setPrice(price - discount);
      setSelectedTransport(null);
    }
  };
  // const handleUpdatePrice = () => {
  // const newOrders = [...orders];
  // const latestOrder = newOrders[newOrders.length - 1];
  // latestOrder.price = price;

  // axios
  //   .put(
  //     `http://localhost:3001/newOrders/${latestOrder.id}`,
  //     latestOrder
  //   )
  //   .then(() => {
  //     console.log("Price has been updated successfully");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // };

  const addNewOrder = (newOrder) => {
    const newOrders = [...orders];
    const latestOrder = newOrders[newOrders.length - 1];
    latestOrder.price = price;
    axios
      .post(`http://localhost:3001/newOrders/${latestOrder.id}`, newOrder)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddNewOrder = () => {
    const newOrder = {
      // Các thông tin khác của đơn hàng
      price: price,
    };
    addNewOrder(newOrder);
  };

  // const addNewPrice = async (orderId, newPrice) => {
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:3001/newOrders/${orderId}/seItems`,
  //       {
  //         newPrice: newPrice,
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const addNewPrice = async (orderId, newPrice) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3001/newOrders/${orderId}`
  //     );
  //     const order = response.data;

  //     // Thêm phần tử newPrice vào trong selectedItems
  //     const newSelectedItems = order.seItems.selectedItems.map((item) => {
  //       return {
  //         ...item,
  //         newPrice: newPrice,
  //       };
  //     });

  //     // Cập nhật lại order trên server với selectedItems mới
  //     const updatedOrder = {
  //       ...order,
  //       seItems: {
  //         ...order.seItems,
  //         selectedItems: newSelectedItems,
  //       },
  //     };
  //     await axios.put(`http://localhost:3001/newOrders/${orderId}`, updatedOrder);

  //     console.log("Thêm newPrice thành công!");
  //   } catch (error) {
  //     console.log("Lỗi:", error);
  //   }
  // };

  let priceLabel =
    selectedTransport === 27000
      ? "Giao Hàng Nhanh"
      : selectedTransport === 28000
      ? "Giao Hàng Tiết Kiệm"
      : selectedTransport === 30000
      ? "Viettel Post"
      : null;

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        const orders = response.data;
        setLatestSelectedQuantity(
          orders.length ? orders[0].selectedQuantity : 0
        );
        setLatestSelectedTotalAmount(
          orders.length ? orders[0].selectedTotalAmount : 0
        );
        setPrice(orders.length ? orders[0].selectedTotalAmount : 0);
      })
      .catch((error) => console.error(error));
  }, []);

  const deleteOrders = () => {
    axios
      .delete(`http://localhost:3001/orders/1`)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const navigateToUser = () => {
    navigate("/user");
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Title: ${title}\nContent: ${content}`);
    setTitle("");
    setContent("");
  };

  const handleOrder = async () => {
    if (selectedTransport === null) {
      toast.error("Hãy chọn đơn vị giao hàng", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      setIsButtonClicked(true);
      await axios.post("http://localhost:3001/newOrders", {
        seItems: orders[0],
      });
      console.log("Data has been transferred successfully");
      toast.success("Đã đặt hàng thành công", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [orders, setOrders] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  const handleClick = () => {
  //    setIsButtonClicked(true);
  //    axios
  //      .post("http://localhost:3001/newOrders", {
  //        seItems: orders[0].selectedItems,
  //      })
  //      .then(() => {
  //        console.log("Data has been transferred successfully");
  //      })
  //      .catch((error) => {
  //        console.log(error);
  //      });
  //  };

  return (
    <Helmet title="Checkout">
      <Information>
        <Map>
          <i className="ri-map-pin-line"></i>ĐỊA CHỈ NHẬN HÀNG
        </Map>
        <User>
          <span>{name}</span>
          <span>{phone}</span>
          <p>{address}</p>
          <h6 onClick={navigateToUser}>Thay Đổi</h6>
        </User>
      </Information>

      <TableOder>
        <table>
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  {order.selectedItems.map((item) => (
                    <div key={item.id} className="image">
                      <img src={item.imgUrl} alt={item.productName} />
                    </div>
                  ))}
                </td>

                <td>
                  {order.selectedItems.map((item) => (
                    <h6 key={item.id}>{item.productName}</h6>
                  ))}
                </td>

                <td>
                  {order.selectedItems.map((item) => (
                    <h6 key={item.id}>
                      {item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h6>
                  ))}
                </td>

                <td>
                  {order.selectedItems.map((item) => (
                    <h6 key={item.id}>{item.quantity}</h6>
                  ))}
                </td>

                <td>
                  {order.selectedItems.map((item) => (
                    <h6 key={item.id}>
                      {item.totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h6>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Table>
          <div className="quantity">
            Số lượng Sản Phẩm: <h6>{latestSelectedQuantity}</h6>
          </div>
          <div className="value">
            Tổng Tiền:
            <h6>
              {" "}
              {latestSelectedTotalAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </h6>
          </div>
          <div className="order__correction" onClick={deleteOrders}>
            <Link to={"/cart"}>xem lại đơn hàng</Link>
            {/* <button onClick={handleClick} disabled={isButtonClicked}>
              {isButtonClicked ? "Data has been transferred" : "Transfer data"}
            </button> */}
          </div>
        </Table>
      </TableOder>

      <Note>
        <NoteText>
          <h6> Ghi chú :</h6>
          <form action="" onSubmit={handleSubmit}>
            <textarea
              type="text"
              name="content"
              value={content}
              onChange={handleContentChange}
            />
          </form>
        </NoteText>

        <Transport>
          <div className="voucher">
            <div className="select__voucher">
              <div className="voucher__button">
                <h6>Giao Hàng Nhanh</h6>
                <button onClick={() => handleDiscountTransport(27000)}>
                  {selectedTransport === 27000 ? "Bỏ Chọn" : "Chọn"}
                </button>
              </div>
              <div className="voucher__button">
                <h6>Viettel Post</h6>
                <button onClick={() => handleDiscountTransport(30000)}>
                  {selectedTransport === 30000 ? "Bỏ Chọn" : " Chọn"}
                </button>
              </div>
              <div className="voucher__button">
                <h6>Giao Hàng Tiết Kiệm</h6>
                <button onClick={() => handleDiscountTransport(28000)}>
                  {selectedTransport === 28000 ? "Bỏ Chọn" : " Chọn"}
                </button>
              </div>
            </div>
            <div className="text__transport">
              <h6>Đơn Vị Vận Chuyển :</h6>
              <p>{priceLabel}</p>
              <p>{selectedTransport}</p>
            </div>
          </div>
        </Transport>
      </Note>

      <Total>
        <div className="total__money">
          tổng số tiền ({latestSelectedQuantity}) sản phẩm :
        </div>
        <h6>
          {latestSelectedTotalAmount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </h6>
      </Total>
      <Voucher>
        <div className="voucher">
          <div className="voucher__text">Voucher hôm nay</div>
          <div className="select__voucher">
            <div className="voucher__button">
              <p>Voucher</p>
              <button onClick={() => handleDiscountVoucher(555000)}>
                {selectedVoucher === 555000 ? "Bỏ Chọn" : "10%"}
              </button>
            </div>
            <div className="voucher__button">
              <p>Voucher</p>
              <button onClick={() => handleDiscountVoucher(350000)}>
                {selectedVoucher === 350000 ? "Bỏ Chọn" : " 350k"}
              </button>
            </div>
            <div className="voucher__button">
              <p>Voucher</p>
              <button onClick={() => handleDiscountVoucher(500000)}>
                {selectedVoucher === 500000 ? "Bỏ Chọn" : " 15%"}
              </button>
            </div>
          </div>
          <div className="voucher__content">
            <div>
              <h6>
                Giảm chỉ còn:{" "}
                {price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h6>
              {selectedVoucher && (
                <p>
                  Voucher:{" "}
                  {selectedVoucher.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      </Voucher>
      <Oder>
        <div className="method">
          <h6>Phương thức thanh toán</h6>
          <ul className="d-flex">
            {delivery.map((option) => (
              <li
                key={option}
                className={selectedDelivery === option ? "selected" : ""}
                onClick={() => handleOptionSelect(option)}
              >
                <span onClick={() => handleOptionSelect(option)}>
                  {selectedDelivery === option && (
                    <i className="ri-check-line"></i>
                  )}
                  {option}
                </span>
              </li>
            ))}
          </ul>

          <StyledModal
            title="Quét mã QR để thanh toán"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="img__qr">
              <img src={qr} alt="qr" />
              <div className="total__order">
                <div className="total__order__text">
                  <div>
                    {selectedDelivery && <div>Phương thức thanh toán :</div>}
                  </div>
                  <div>Tổng tiền hàng:</div>
                  <div>{selectedTransport && <div>Phí vận chuyển:</div>}</div>
                  <div>
                    {selectedTransport && <div>Đơn vị vận chuyển:</div>}
                  </div>
                  <div>{selectedVoucher && <div>Voucher giảm:</div>}</div>
                  <div className="total__order__all">Tổng thanh toán:</div>
                </div>
                <div className="total__order__number">
                  <div>{selectedDelivery}</div>
                  <div>
                    {latestSelectedTotalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <div>{selectedTransport}</div>
                  <div>{priceLabel}</div>
                  <div>
                    {selectedVoucher && (
                      <div>
                        {selectedVoucher.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    )}
                  </div>
                  <div className="total__order__amount">
                    {price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </StyledModal>
        </div>
        <div className="total__order">
          <div className="order__content">
            <p> {content}</p>
          </div>
          <div className="total__order__text">
            <div>{selectedDelivery && <div>Phương thức thanh toán</div>}</div>
            <div>Tổng tiền hàng</div>
            <div>{selectedTransport && <div>Phí vận chuyển</div>}</div>
            <div>{selectedTransport && <div>Đơn vị vận chuyển</div>}</div>
            <div>{selectedVoucher && <div>Voucher giảm:</div>}</div>
          </div>
          <div className="total__order__text">
            {/* 1 */}
            <div>{selectedDelivery}</div>
            {/* 2 */}
            <div>
              {latestSelectedTotalAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            {/* 3 */}
            <div>{selectedTransport}</div>
            {/* 4 */}
            <div>{priceLabel}</div>
            {/* 5 */}
            <div>
              {selectedVoucher && (
                <p>
                  {selectedVoucher.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="total__money">
          <p> </p>
          <div className="total__order__text">
            <div>Tổng thanh toán:</div>
          </div>
          <div className="total__order__text">
            <div className="total__order__amount">
              {price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        </div>

        <Add>
          <div>
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản
            Hienmobi
          </div>

          <div className="button__order" onClick={deleteOrders}>
            <button
              type="summit"
              onClick={handleOrder}
              disabled={isButtonClicked}
              className="buy__btn w-100 "
            >
              {isButtonClicked ? (
                "Đã đặt hàng"
              ) : (
                <span onClick={handleAddNewOrder}>Đặt hàng</span>
              )}
            </button>
          </div>
        </Add>
      </Oder>
    </Helmet>
  );
};

export default Checkout;
