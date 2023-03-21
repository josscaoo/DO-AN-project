import React from "react";
import { Container, Row, Col } from "reactstrap";
// import { db } from '../firebase.config';
// import { doc, deleteDoc } from 'firebase/firestore';
// import useGetData from "../custom-hooks/useGetData";
import { toast } from 'react-toastify';
const AllProducts = () => {
  const { data: productsData, loading } = useGetData('products');

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Delete!')
  };

  return (
    <Container>
      <Row>
        <Col lg="12">
          <table className="table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Nội dung</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>xóa</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <h4 className="py-5 text-center fw-bold">loading.........</h4>
              ) : (
                productsData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imgUrl} alt="" />
                    </td>
                    <td> {item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.price}VND</td>
                    <td>
                      <button
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Thu hồi
                        </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllProducts;


