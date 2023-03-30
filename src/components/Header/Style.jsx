import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 12rem;
  line-height: 23px;
  overflow-x: hidden;
  @media (max-width: 1024px) {
    width: 100%;
    height: 70px;
    line-height: 60px;
  }
`;
export const Main = styled.div`
  width: 100%;
  border-top: #fff 5px solid;
  background-color: #bd0a0a;
  display: flex;
  padding-top: 5px;
  @media (max-width: 1024px) {
    height: 100px;
    padding-right: 20px;
  }
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: 435px;
  padding-left: 150px;
  img {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    @media (max-width: 1024px) {
      display: none;
      width: 1rem;
      height: 1rem;
    }
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }

`;
export const Navigation = styled.div`
display: flex;
flex: 1;
margin: auto;
width: 50%;
  @media (max-width: 1024px) {

  }
`;
export const Hyper = styled.ul`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  flex: 1;
  cursor: pointer;
  :hover{
    color: #fff;
    font-weight: 600;
  }
  li {
    display: inline;
    padding-right: 60px;
  }
  a {
    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
    }
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  margin-right: 100px;
  @media (max-width: 1024px) {
    font-size: 5px;
    padding-left: 0;
    display: flex;
  }
  i {
    font-size: 2.4rem;
    color: #fff;
    cursor: pointer;
  }
`;
export const Actions = styled.div`
  color: black;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  .menu__user-list {
    margin-top: 5px;
    padding-left: 30px;
    padding-right: 30px;
    margin-left: -60px;
    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.573);
    background-color: #d3d3d3;
    position: absolute;
    z-index: 1;
    list-style: none;
  }
  .menu__user-list li {
    font-size: 13px;
    text-align: center;
  }
  .menu__user-list li:hover {
    font-weight: 500;
  }
`;
export const Auth = styled.div`
  display: flex;
  color: white;

`;
export const Register = styled.div`
  border-right: 2px solid #fff;
  font-size: 15px;

  padding-right: 10px;
  .register:hover {
    color: #000000;
  }
`;
export const Login = styled.div`
  font-size: 15px;
  border-right: 2px solid #fff;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: #e0e41b;
  .login:hover {
    color: #060606;
  }
`;
export const Cart = styled.span`
  position: relative;
  @media (max-width: 1024px) {
    padding-left: 5px;
  }
  i {
    @media (max-width: 1024px) {
      font-size: 1.2rem;
      padding-left: 10px;
    }
  }
`;
export const Badge = styled.span`
  position: absolute;
  top: 1px;
  right: -30%;
  width: 15px;
  height: 15px;
  content: "";
  background: #ffffff;
  color: #eb0b0b;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 10;
  @media (max-width: 1024px) {
    margin-top: 5px;
  }
`;
export const Mobile = styled.div`
  font-size: 1.3rem;
  color: var(--primary-color);
  display: none;
  @media (max-width: 1024px) {
    display: block;
    padding-left: 5px;
  }
  @media (max-width: 768px) {
    display: block;
    padding-left: 5px;
  }
  i {
    @media (max-width: 1024px) {
      font-size: 1.5rem;
    }
  }
`;
