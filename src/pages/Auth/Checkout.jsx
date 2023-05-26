import Helmet from "../../components/Helmet/Helmet";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import qr from "../../assets/QR.jpg";
import { toast } from "react-toastify";
import { Add, Information, Map, Note, NoteText, Oder, StyledModal, Table, TableOder, Total, Transport, User, Voucher } from "./Style";


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


  const handleOrder = async () => {
    try {
      const userId = parseInt(localStorage.getItem("user_id"));

      if (selectedTransport === null) {
        toast.error("Hãy chọn đơn vị giao hàng", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }

      setIsButtonClicked(true);

      // Thêm userId vào đối tượng sản phẩm mới
      const newOrder = {
        price: price,
        userId: userId,
        Items: orders[0],
      };

      // Gửi yêu cầu POST để tạo đơn hàng mới
      await axios.post("http://localhost:3001/newOrders", newOrder);

      console.log("Dữ liệu đã được chuyển thành công");
      toast.success("Đã đặt hàng thành công", {
        position: "top-center",
        autoClose: 2000,
      });

      navigate("/");
      // Xóa đơn hàng
      await axios.delete(`http://localhost:3001/orders/1`);

      console.log("Đã xóa đơn hàng thành công");
    } catch (error) {
      console.log(error);
    }

  };


  const deleteOrders = () => {
    axios
      .delete(`http://localhost:3001/orders/1`)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };


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
              <button onClick={() => handleDiscountVoucher(390000)}>
                {selectedVoucher === 390000 ? "Bỏ Chọn" : "390k"}
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
              <button onClick={() => handleDiscountVoucher(380000)}>
                {selectedVoucher === 380000 ? "Bỏ Chọn" : " 380k"}
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

          <div className="button__order"
            // onClick={deleteOrders}
          >
            <button
              type="summit"
              onClick={handleOrder}
              disabled={isButtonClicked}
              className="buy__btn w-100 "
            >
              {isButtonClicked ? (
                "Đã đặt hàng"
              ) : (
                <span >Đặt hàng</span>
              )}
            </button>
          </div>
        </Add>
      </Oder>
    </Helmet>
  );
};

export default Checkout;
