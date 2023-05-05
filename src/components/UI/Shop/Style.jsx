import styled from "styled-components";

export const Container = styled.div`
  cursor: pointer;
  border: 1px solid rgba(103, 103, 110, 0.221);
  border-radius: 5px;
  height: 360px;
  width: 250px;
  &:hover {
    box-shadow: 0 0 10px 5px rgba(103, 103, 110, 0.5);
    border-color: rgba(0, 0, 24, 0.2);
  }
`;

export const Images = styled.div`
  width: 200px;
  height: 200px;
  margin: auto;
  margin-top: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    width: 180px;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

export const Info = styled.div`
margin: 0 5px ;
  h6 {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 15px;
    color: var(--primary-color);
    height: 50px;

    a {
      &:hover {
        color: #a64747;
      }

      @media (max-width: 992px) {
        font-size: 1rem;
      }

      @media (max-width: 1024px) {
        font-size: 14px;
      }

      @media (max-width: 768px) {
        font-size: 10px;
      }
    }
  }

  span {
    font-size: 0.9rem;
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  color: black;
  margin: 0 5px;

  h4 {
    font-size: 1rem;
    font-weight: 550;
    color: #940707;
    @media (max-width: 1024px) {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }

  span {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;

    i {
      font-size: 1rem;
      padding: 5px;
      border-radius: 50px;
      color: #fff;
      background: #940707;

      @media (max-width: 1024px) {
        font-size: 10px;
      }

      @media (max-width: 768px) {
        font-size: 10px;
      }
    }

    @media (max-width: 1024px) {
      font-size: 15px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;
