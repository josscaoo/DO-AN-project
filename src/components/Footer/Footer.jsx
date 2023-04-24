import React from 'react';
import {Category, Copyright, FooterForm, Logo, Shortcuts} from './Style'

import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from 'react-router-dom';

const Footer = () => {

  const year = new Date().getFullYear()
  return (
    <FooterForm>
      <Row>
        <Col lg="4" className="mb-4" md="6">
          <Logo>
            <h4>HienMobi</h4>
          </Logo>
          <p className="footer__text mt-4">
            Là đại lý ủy quyền chính thức của Apple tại Việt Nam (Apple
            Authorized Reseller) từ tháng 11/2020, HienMobi đem đến cho quý
            khách hàng những trải nghiệm tuyệt vời khi mua sắm các sản phẩm,
            dịch vụ của Apple với chất lượng tốt nhất cùng thái độ phục vụ đúng
            chuẩn AAR
          </p>
        </Col>

        <Col lg="3" className="mb-4" md="3">
          <Category>
            <Shortcuts>Danh Mục Hàng Đầu</Shortcuts>
            <ListGroup>
              <ListGroupItem className="ps-0 border-0">
                <Link to="#">Iphone</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to="#">SamSung</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to="#">Oppo</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to="#">Xiaomi</Link>
              </ListGroupItem>
            </ListGroup>
          </Category>
        </Col>

        <Col lg="2" className="mb-4" md="3">
          <Category>
            <Shortcuts> Liên kết</Shortcuts>
            <ListGroup>
              <ListGroupItem className="ps-0 border-0">
                <Link to="/shop">Cửa hàng</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to="/cart">Giỏ hàng</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to="/login">Đăng nhập</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to="#">Chính sách bảo mật</Link>
              </ListGroupItem>
            </ListGroup>
          </Category>
        </Col>

        <Col lg="3" md="3">
          <Category>
            <Shortcuts>Thông Tin</Shortcuts>
            <ListGroup className="footer__contact">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span>
                  <i className="ri-map-pin-line"></i>
                </span>
                <p>123 DaNang VietNam</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span>
                  <i className="ri-phone-line"></i>
                </span>
                <p>+0123456789</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span>
                  <i className="ri-mail-line"></i>
                </span>
                <p>abcd@gmail.com</p>
              </ListGroupItem>
            </ListGroup>
          </Category>
        </Col>

        <Col lg="12">
          <Copyright>
            Bản quyền {year} được phát triển bởi HienMobi. Đã đăng ký Bản quyền.
          </Copyright>
        </Col>
      </Row>
    </FooterForm>
  );
}

export default Footer