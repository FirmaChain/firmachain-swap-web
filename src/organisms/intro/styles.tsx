import styled from "styled-components";

export const IntroContainer = styled.div`
  width: 100%;
  padding-bottom: 50px;
`;

export const SwapIcon = styled.div`
  width: 100%;
  height: 200px;
  margin: auto;
  margin-top: 90px;
  margin-bottom: 80px;
  background-image: url("${process.env.PUBLIC_URL + "/images/main.png"}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const SwapButton = styled.div`
  width: 200px;
  height: 45px;
  line-height: 45px;
  border-radius: 40px;
  cursor: pointer;
  background-color: #3550de;
  font-size: 18px;
  color: white;
  margin: 0px auto 0 auto;
  text-align: center;
  font-family: "Chakra" !important;
`;

export const StatusLink = styled.div`
  font-size: 14px;
  color: #bbb;
  margin-top: 20px;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
`;
