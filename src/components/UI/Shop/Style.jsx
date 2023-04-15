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
    width: 200px;
    height: 150px;
  }
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`; 
export const Info = styled.div`
  h3 {
    font-size: 1.2rem;
    color: var(--primary-color);
    font-weight: 600;
    margin-top: 15px;
    a:hover {
      color: #a64747;
    }
    a {
      @media (max-width: 992px) {
        font-size: 1.1rem;
      }
      @media (max-width: 1024px) {
        font-size: 15px;
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
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  h4 {
    color: var(--primary-color);
    font-size: 1.3rem;
    font-weight: 500;
  }
  span {
    i {
      font-size: 1.2rem;
      padding: 5px;
      background: var(--primary-color);
      color: #fff;
      border-radius: 50px;
      @media (max-width: 1024px) {
        font-size: 12px;
      }
      @media (max-width: 768px) {
        font-size: 12px;
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
// export const Container = styled.div``; 
