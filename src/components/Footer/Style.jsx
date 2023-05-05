import styled from "styled-components";

export const FooterForm = styled.div`
  padding-top: 60px;
  padding-bottom: 30px;
  background-color: #ffffff;
  padding-left: 9rem;
  overflow-x: hidden;
  display: flex;
  .footer__text{
    font-size: 15px;
  } @media (max-width: 1024px) {
    padding-left: 15px;
  }
  @media (max-width: 768px) {
    padding-left: 50px;
  }
`;
export const Main = styled.div``;
export const Container = styled.div``;
export const Logo = styled.div`
h4{
  font-weight: 600;
  font-size: 25px;
}

`;
export const Category = styled.div`
  ul li a {
    color: rgb(109, 103, 103);
  }
  ul li {
    background: transparent !important;
  }
`;
export const Shortcuts = styled.p`
  margin-bottom: 30px;
  color: black;
  font-weight: 700;
  font-size: 1rem;
`;
export const Information = styled.div``;
export const Copyright = styled.div`
  color: rgba(170, 4, 4, 0.735);
  font-size: 0.9rem;
  margin-top: 50px;
`;
export const ListGroupItem = styled.div`
padding-top: 8px;
  p {
    cursor: pointer;
    font-size: 15px;
  }
`;

