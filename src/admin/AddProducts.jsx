import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState("null");
  const [loading, setLoading] = useState(false);

  const [productPriceError, setProductPriceError] = useState("");
  function handleProductPriceChange(event) {
    const input = event.target.value;
    const regex = /^[0-9]+$/;

    if (!regex.test(input)) {
      setProductPriceError("Vui lòng nhập giá trị sản phẩm");
    }
     else {
      setProductPriceError("");
    }

    setEnterPrice(input);
  }
  

  const navigate = useNavigate();

  const addProduct = async e => {
    e.preventDefault();
    setLoading(true)

    // ====== add product to firebase database =====
    try {
      const docRef = await collection(db, 'products');

      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name} `
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        () => {
        toast.error('Hình ảnh không được tải lên!')
        },
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(docRef, {
            title: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadURL,
          });
        });
        
        }
      );
      setLoading(false)
      toast.success("Đã thêm sản phẩm");
      navigate('/dashboard/all-products');


    } catch (err) {

      setLoading(false)
      toast.error("sản phẩm không được thêm vào!");
    }
    
      // console.log(product);
  };


  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading........</h4>
            ) : (
              <>
                <h4 className="mb-5">Thêm Sản Phẩm</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Tên sản phẩm</span>
                    <input
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>Mô tả sản phẩm</span>
                    <input
                      type="text"
                      placeholder="Chi tiết sản phẩm....."
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <span>Mô tả</span>
                    <input
                      type="text"
                      placeholder="Mô tả "
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Giá</span>
                      <input
                        type="text"
                        id="enterPrice"
                        name="enterPrice"
                        placeholder="nhập giá tiền"
                        value={enterPrice}
                        // onChange={(e) => setEnterPrice(e.target.value)}
                        onChange={handleProductPriceChange}
                        required
                      />
                      <span style={{ color: "red" }}>{productPriceError}</span>
                    </FormGroup>

                    <FormGroup className="form__group w-50">
                      <span>Phân Loại </span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                        required
                      >
                        <option> Tùy chọn</option>
                        <option value="samsung">samsung</option>
                        <option value="iphone">iphone</option>
                        <option value="oppo">oppo</option>
                        <option value="vivo">vivo</option>
                        <option value="realme">realme</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group">
                      <span>Hình ảnh minh họa</span>
                      <input
                        type="file"
                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                        required
                      />
                    </FormGroup>
                  </div>

                  <button className="buy__btn" type="submit">
                    Thêm Sản phẩm
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;

