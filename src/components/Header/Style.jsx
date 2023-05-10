import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 10rem;
  line-height: 23px;
  overflow-x: hidden;
  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`;
export const Main = styled.div`
  width: 100%;
  border-top: #fff 5px solid;
  background-color: #940707;
  display: flex;
  padding-top: 5px;
  height: 6rem;
  @media (max-width: 1024px) {
    display: flex;
    border-top: none;
    height: 70px;
    padding-right: 20px;
    padding-bottom: 10px;
  }
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: 435px;
  padding-left: 150px;
  @media (max-width: 1024px) {
    width: 250px;
    padding-left: 15px;
    padding-right: 30px;
  }
  img {
    width: 3.5rem;
    height: 3.5rem;
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
  h1:hover {
    text-shadow: 4px 2px 4px rgba(7, 6, 6, 0.653);
  }
`;
export const Navigation = styled.div`
  flex: 1;
  margin-top: 40px;
  @media (max-width: 1024px) {
  }

`;
export const Hyper = styled.ul`
  color: #fff;
  font-size: 17px;
  font-weight: 450;
  cursor: pointer;
  display: flex;
  margin-bottom: 0;
  i {
    font-size: 22px;
  }
  flex: 1;
  span {
    @media (max-width: 768px) {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    font-size: 14px;
  }

  :hover {
    text-shadow: 2px 3px 4px rgba(255, 255, 255, 0.8);
  }
  a {
    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
    }
  }
`;
export const HeaderComponent = styled.div`
display: flex;
`;
export const HeaderText = styled.div`
  display: flex;
  overflow-x: hidden;
  @media (max-width: 1024px) {
    display: none;
  }
`;
export const Text = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  margin-right: 100px;
  @media (max-width: 1024px) {
    margin-left: 15px;
    display: flex;
    margin-right: 0;
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
    /* margin-top: 5px; */
    padding-left: 30px;
    padding-right: 30px;
    margin-right: 10px;
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
export const Name = styled.div`
  @media (max-width: 1024px) {
  }
  h4 {
    margin-top: 15px;
    font-weight: 600;
    font-size: 13px;
    color: white;
    @media (max-width: 425px) {
      display: none;
    }
    @media (max-width: 1024px) {
      margin-top: 15px;
    }
    i {
      @media (max-width: 425px) {
        display: none;
      }
    }
  }
`;
export const Auth = styled.div`
  color: white;
  @media (max-width: 1024px) {
    display: flex;
  }
`;
export const Register = styled.div`
  border-right: 2px solid #fff;
  font-size: 15px;

  padding-right: 10px;
  .register:hover {
    color: #000000;
  }
  @media (max-width: 1024px) {
    font-size: 13px;
    border-right: 1px solid #fff;
  }
`;
export const Login = styled.div`
  font-size: 15px;
  border-right: 2px solid #fff;
  /* padding-left: 10px; */
  padding-right: 10px;
  box-shadow: #e0e41b;
  .login:hover {
    color: #060606;
  }
  @media (max-width: 1024px) {
    font-size: 13px;
    padding-right: 10px;
    padding-left: 5px;
    border-right: 1px solid #fff;
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
