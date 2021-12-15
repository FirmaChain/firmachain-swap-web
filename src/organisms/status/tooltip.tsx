import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  &:hover > div,
  &:active > div {
    display: block;
  }
`;

const Content = styled.div`
  display: none;
  position: absolute;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  border-radius: 4px;
  z-index: 200;
  top: 40px;
  background-color: #3550de;
`;

const Tooltip = ({ children, message }: any) => {
  return (
    <Container>
      {children}
      <Content>{message}</Content>
    </Container>
  );
};

export default React.memo(Tooltip);
