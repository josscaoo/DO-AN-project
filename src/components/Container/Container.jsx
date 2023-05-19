import styled from "styled-components";


const ContainerRoot = styled.div({
  maxWidth: 1200,
  margin: "0 auto",
  backgroundColor: "#f4f7faaa",
});

export default function Container({ children }) {
  return <ContainerRoot className="container">{children}</ContainerRoot>;
}
