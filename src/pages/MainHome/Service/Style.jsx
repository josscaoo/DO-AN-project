import styled from "styled-components";

export const Container = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 3.9rem;
  line-height: 50px;
  display: flex;
  @media (max-width: 1024px) {
    margin: 1px;
  }
  @media (max-width: 992px) {
    display: none;
  }
`;
export const Main = styled.div`
    font-weight: 700;
    font-size: 19px;
`;
export const Body = styled.div`
    display: flex;
    margin-left: 24rem;
    padding-left: 50px;
`;
export const List = styled.ul`
li{
    display: inline;
    cursor: pointer;
    border: 1px solid rgb(150, 146, 146);
    padding: 5px;
    border-radius: 10px;
    margin-right: 10px;
    font-size: 13px;
    padding-left: 20px;
}
li:hover{
    background-color: rgb(181, 12, 12);
    color: white;
    font-size: 14px;
}
`;
export const Add = styled.div`
    padding-left: 40px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    :hover{
    color: rgb(214, 137, 13);
}
`;