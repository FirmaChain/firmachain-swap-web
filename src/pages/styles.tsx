import styled from "styled-components";

export const MainContainer = styled.div`
  width: calc(100% - 40px);
  margin: auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 620px) {
    width: 600px;
  }
`;

export const TestWrapper = styled.div`
  width: 100%;
`;
