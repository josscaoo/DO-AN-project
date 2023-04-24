import styled from "styled-components";

export const Container = styled.div`
  cursor: pointer;
  margin: 10px;

  img {
    border-radius: 15px;
  }
`;

export const Images = styled.div`
  width: 250px;
  height: 250px;

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
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 15px;
    color: var(--primary-color);

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
  padding: 2px;
  font-size: 1.3rem;
  font-weight: 500;
  color: black;

  h4 {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--primary-color);
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
      font-size: 1.2rem;
      padding: 5px;
      border-radius: 50px;
      color: #fff;
      background: var(--primary-color);

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
