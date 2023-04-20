import Helmet from "../../components/Helmet/Helmet";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Navigate } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import qr from "../../assets/images/QR.jpg";
import { toast } from "react-toastify";

const Information = styled.form`
  background-color: #e9f4f9ce;
  width: 100%;
`;
const Products = styled.div``;
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

const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  display: flex;
  .quantity {
    font-size: 15px;
    font-weight: 500;
    margin-left: 15px;
    display: flex;
    flex: 1;

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
        background-color: #007bff;

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

const Checkout = () => {
  const name = useSelector((state) => state.auth.name);
  const address = useSelector((state) => state.auth.address);
  const phone = useSelector((state) => state.auth.phone);
  const navigate = useNavigate();

  const [latestSelectedQuantity, setLatestSelectedQuantity] = useState(0);
  const [latestSelectedTotalAmount, setLatestSelectedTotalAmount] = useState(0);

  const [alo, setAlo] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        const orders = response.data;
        orders.sort((a, b) => b.id - a.id);
        const alo = orders[0]?.selectedTotalAmount || 0;
        setAlo(alo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        const orders = response.data;
        orders.sort((a, b) => b.id - a.id);
        const latestQuantity = orders[0]?.selectedQuantity || 0;
        setLatestSelectedQuantity(latestQuantity);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        const orders = response.data;
        orders.sort((a, b) => b.id - a.id);
        const latestTotalAmount = orders[0]?.selectedTotalAmount || 0;
        setLatestSelectedTotalAmount(latestTotalAmount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = [
    { name: "Giao Hàng Nhanh", price: 30000 },
    { name: "Giao Hàng Tiết Kiệm", price: 28000 },
    { name: "Viettel Post", price: 25000 },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]); // giá trị mặc định là phần tử đầu tiên trong danh sách

  const [price, setPrice] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        const orders = response.data;
        orders.sort((a, b) => b.id - a.id);
        const price = orders[0]?.selectedTotalAmount || 0;
        setPrice(price);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleDiscountVoucher = (discount) => {
    if (selectedVoucher === null) {
      setPrice(price - discount);
      setSelectedVoucher(discount);
    } else if (selectedVoucher === discount) {
      setPrice(price + discount);
      setSelectedVoucher(null);
    }
  };

  const [selectedTransport, setSelectedTransport] = useState(null);

  const handleDiscountTransport = (discount) => {
    if (selectedTransport === null) {
      setPrice(price + discount);
      setSelectedTransport(discount);
    } else if (selectedTransport === discount) {
      setPrice(price - discount);
      setSelectedTransport(null);
    }
  };
  let priceLabel;
  if (selectedTransport === 27000) {
    priceLabel = "Giao Hàng Nhanh";
  } else if (selectedTransport === 28000) {
    priceLabel = "Giao Hàng Tiết Kiệm";
  } else if (selectedTransport === 30000) {
    priceLabel = "Viettel Post";
  }
  // ***

  const delivery = ["thanh toán khi nhận hàng", "Quét mã QR"];
  const [selectedDelivery, setSelectedDelivery] = useState(delivery[0]);
  const [isQRScanned, setIsQRScanned] = useState(false);

  const [isModalOpenB, setIsModalOpenB] = useState(false);

  const handleOptionSelectB = (option) => {
    setSelectedDelivery(option);
    setIsQRScanned(option === "Quét mã QR");

    if (option === "Quét mã QR") {
      showModalB();
    }
  };

  const showModalB = () => {
    setIsModalOpenB(true);
  };

  const handleOkB = () => {
    setIsModalOpenB(false);
  };

  const handleCancelB = () => {
    setIsModalOpenB(false);
  };
  const handleOrder = () => {
    if (selectedTransport === null) {
      toast.error("Hãy chọn đơn vị giao hàng", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    } else {
      toast.success("Đã đặt hàng thành công", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    navigate("/");
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Title: ${title}\nContent: ${content}`);
    setTitle("");
    setContent("");
  }

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
          <h6>Thay Đổi</h6>
        </User>
      </Information>
      <Products>
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
          <div className="order__correction">
            <Link to={"/cart"}>xem lại đơn hàng</Link>
          </div>
        </Table>
      </Products>
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
              <button onClick={() => handleDiscountVoucher(30000)}>
                {selectedVoucher === 30000 ? "Bỏ Chọn" : "30k"}
              </button>
            </div>
            <div className="voucher__button">
              <p>Voucher</p>
              <button onClick={() => handleDiscountVoucher(28000)}>
                {selectedVoucher === 28000 ? "Bỏ Chọn" : " 28k"}
              </button>
            </div>
            <div className="voucher__button">
              <p>Voucher</p>
              <button onClick={() => handleDiscountVoucher(25000)}>
                {selectedVoucher === 25000 ? "Bỏ Chọn" : " 25k"}
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
                lassName={selectedDelivery === option ? "selected" : ""}
                onClick={() => handleOptionSelectB(option)}
              >
                <span onClick={() => handleOptionSelectB(option)}>
                  {selectedDelivery === option && (
                    <i className="ri-check-line"></i>
                  )}
                  {option}
                </span>
              </li>
            ))}
          </ul>
          <Modal
            title="Quét mã QR để thanh toán"
            visible={isModalOpenB}
            onOk={handleOkB}
            onCancel={handleCancelB}
          >
            <div>
              <img src={qr} alt="qr" />
            </div>
          </Modal>
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
          <div className="button__order">
            <button
              type="summit"
              className="buy__btn w-100 "
              onClick={handleOrder}
              disabled={isQRScanned}
            >
              Đặt Hàng
            </button>
          </div>
        </Add>
      </Oder>
    </Helmet>
  );
};

export default Checkout;
