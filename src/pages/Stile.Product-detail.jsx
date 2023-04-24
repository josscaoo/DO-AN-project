import styled from "styled-components";

export const Image = styled.section`
  img {
    background-color: #076ec8;
    @media (max-width: 768px) {
      margin: auto;
      width: 60%;
      height: 100%;
    }
  }
  @media (max-width: 988px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
export const Detail = styled.section`
  padding-left: 50px;
  @media (max-width: 768px) {
  }
  h2 {
    font-size: 1.6rem;
    margin-top: 10px;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
  .Add__Cart {
  }
  button {
    background-color: rgb(241, 158, 49);
    color: black;
    font-weight: 600;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    border: 1px;
    margin-top: 5px;
    a:hover {
      background-color: rgb(184, 21, 21);
      color: white;
    }
  }
  button:hover {
    background-color: rgb(184, 21, 21);
    color: white;
  }
`;
export const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: red;
`;
export const DetailReview = styled.section``;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  h6 {
    color: var(--primary-color);
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    padding-right:10px;
  }
  h6:hover{
    color: red;
  }
`;
export const Select = styled.h6`
  color: var(--primary-color);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  padding-right: 10px;
  :hover {
    color: red;
  }
  .active__tab {
    font-weight: 800;
  }
`;

export const Content = styled.div`
  margin-top: 5px;
`;

export const Review = styled.div`
  margin-top: 5px;
`;
export const ReviewWrapper = styled.div`
`;
export const UserName = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
export const TextReview = styled.div`
  margin-left: 10px;
`;
export const SelectReview = styled.div`
  text-align: right;
`;
export const EditReview = styled.div`
  display: flex;
  i {
    padding-left: 10px;
  }
  i:hover {
    color: brown;
    font-size: 15px;
    font-weight: 600;
  }
`;

export const ReviewForm = styled.section`
  width: 70%;
  margin: auto;
  margin-top: 50px;
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 30px;
  }
  button {
    background-color: rgb(241, 158, 49);
    color: black;
    font-weight: 600;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    border: 1px;
    margin-top: 5px;

    a:hover {
      background-color: rgb(184, 21, 21);
      color: white;
    }
  }
  button:hover {
    background-color: rgb(184, 21, 21);
    color: white;
  }
`;
export const FormGroup = styled.div`
  margin-bottom: 30px;
  span {
    display: flex;
    align-items: center;
    column-gap: 5px;
    color: coral;
    font-weight: 600;
    cursor: pointer;
  }
  textarea {
    width: 100%;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    padding: 8px 20px;
  }
  input {
    width: 100%;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    padding: 8px 20px;
  }
  textarea:focus {
    outline: none;
  }
  input:focus {
    outline: none;
  }
  button {
    background-color: rgb(241, 158, 49);
    color: black;
    font-weight: 600;
    border-radius: 10px;
    width: 100px;
    height: 25px;
    border: 1px;

    a:hover {
      background-color: rgb(184, 21, 21);
      color: white;
    }
  }
  button:hover {
    background-color: rgb(184, 21, 21);
    color: white;
  }
`;

export const Related = styled.section`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 30px;
`;