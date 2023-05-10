// import { useEffect, useState } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { Button, message, Popconfirm } from "antd";

// const Container = styled.div`
//   display: flex;
// `;

// const Users = styled.div``;
// const User = styled.div`
//   display: flex;
//   font-size: 14px;
//   h6 {
//     font-size: 15px;
//     padding-left: 10px;
//   }
// `;
// const Total = styled.div`
//   margin-top: 20px;
//   font-size: 14px;
//   p {
//     font-size: 13px;
//     color: #ff7300;
//   }
// `;
// const NumberTotal = styled.div`
//   font-size: 20px;
//   font-weight: 600;
//   color: #e90000;
// `;
// const Product = styled.div`
//   display: flex;
//   margin-top: 10px;
// `;
// const Table = styled.table`
//   margin-left: 10px;
//   width: 55rem;
//   background-color: aliceblue;
//   tr {
//     @media (max-width: 1024px) {
//       padding-left: 10px;
//     }
//     td {
//       padding-top: 10px;
//       padding-right: 40px;
//       padding-bottom: 15px;
//       cursor: pointer;
//       color: var(--primary-color);
//       border-bottom: 1px solid rgb(133, 129, 129);

//       img {
//         width: 80px;
//         height: 80px;
//         object-fit: cover;
//       }
//     }
//     th {
//       padding-right: 10px;
//     }
//   }
// `;
// const Amount = styled.div``;
// const Quantity = styled.div``;
// const Status = styled.div`
//   text-align: center;
//   color: red;
//   border-bottom: 1px dotted #898989;
// `;
// const ButtonDelete = styled(Button)`
//   background-color: #afc7db;
//   border: 1px solid aliceblue;
//   color: #0073d7;
//   &:hover {
//     background-color: #b00000;
//     color: white;
//   }
// `;

// const OrdersTable = ({ order }) => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { address, phone, name } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:3001/newOrders");
//         setOrders(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3001/newOrders/${order.id}`);
//       toast.success("Đơn hàng đã bị xóa!");
//       setIsLoading(false);
//       window.location.reload(); // Reload the page
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const confirm = (e) => {
//     console.log(e);
//     message.success("Click on Yes");
//   };
//   const cancel = (e) => {
//     console.log(e);
//     message.error("Click on No");
//   };

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <Container>
//       <Product>
//         <Users>
//           <User>
//             Tên khách hàng: <h6>{name}</h6>
//           </User>
//           <User>
//             Số điện thoại: <h6>{phone}</h6>
//           </User>
//           <User>
//             Địa chỉ: <h6>{address}</h6>
//           </User>
//           {orders.map((item) => (
//             <Total key={item.id}>
//               <Amount>
//                 Chờ Thanh toán:
//                 <NumberTotal>{item.newPrice}</NumberTotal>
//               </Amount>
//               <Quantity>số lượng: {item.selectedQuantity}</Quantity>
//               <Amount>Giá gốc: {item.selectedTotalAmount}</Amount>
//               <Popconfirm
//                 title="Bạn có chắc sẽ hủy đơn hàng"
//                 onConfirm={confirm}
//                 onCancel={cancel}
//                 okText={<h6 onClick={handleDelete}>Có</h6>}
//                 cancelText={<h6>Không</h6>}
//               >
//                 <ButtonDelete type="link">Hủy đơn hàng</ButtonDelete>
//               </Popconfirm>
//             </Total>
//           ))}
//         </Users>
//         <button onClick={handleDelete}>aaa</button>
//       </Product>
//       <Table>
//         <thead>
//           <tr>
//             <th>Sản phẩm</th>
//             <th>Tên</th>
//             <th>Giá</th>
//             <th>Số lượng</th>
//             <th>Tổng tiền</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) =>
//             order.selectedItems.map(
//               ({ id, productName, quantity, price, totalPrice, imgUrl }) => (
//                 <tr key={id}>
//                   <td>
//                     <img src={imgUrl} alt="" />
//                   </td>
//                   <td>{productName}</td>
//                   <td>{price}</td>
//                   <td>{quantity}</td>
//                   <td>{totalPrice}</td>
//                 </tr>
//               )
//             )
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default OrdersTable;

import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, message, Popconfirm } from "antd";

const Container = styled.div`
  display: flex;
`;

const Users = styled.div``;
const User = styled.div`
  display: flex;
  font-size: 14px;
  h6 {
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

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { address, phone, name } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/newOrders");
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/newOrders/${id}`);
      toast.success("Đơn hàng đã bị xóa!");
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <Product>
        <Users>
          <User>
            Tên khách hàng: <h6>{name}</h6>
          </User>
          <User>
            Số điện thoại: <h6>{phone}</h6>
          </User>
          <User>
            Địa chỉ: <h6>{address}</h6>
          </User>
          {orders.map((item) => (
            <Total key={item.id}>
              <Amount>
                Chờ Thanh toán:
                <NumberTotal>{item.newPrice}</NumberTotal>
              </Amount>
              <Quantity>số lượng: {item.selectedQuantity}</Quantity>
              <Amount>Giá gốc: {item.selectedTotalAmount}</Amount>
              <Popconfirm
                title="Bạn có chắc sẽ hủy đơn hàng"
                onConfirm={() => handleDelete(item.id)}
                onCancel={() => {}}
                okText={<h6>Có</h6>}
                cancelText={<h6>Không</h6>}
              >
                <ButtonDelete type="link">Hủy đơn hàng</ButtonDelete>
              </Popconfirm>
            </Total>
          ))}
        </Users>
      </Product>
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
          {orders.map((order) =>
            order.selectedItems.map(
              ({ id, productName, quantity, price, totalPrice, imgUrl }) => (
                <tr key={id}>
                  <td>
                    <img src={imgUrl} alt="" />
                  </td>
                  <td>{productName}</td>
                  <td>{price}</td>
                  <td>{quantity}</td>
                  <td>{totalPrice}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrdersTable;
