import styled, { keyframes } from "styled-components";

export const IntroContainer = styled.div`
  width: 100%;
  padding-bottom: 50px;
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

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  &:first-child {
    & > div {
    }
  }
`;

export const Label = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  margin-bottom: 5px;
  color: #999;
`;

export const InputBoxDefault = styled.input`
  width: calc(100% - 24px);
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 0 10px;
  color: white;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #555;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const DownloadWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  gap: 0 20px;
  justify-content: center;
`;

export const DownloadItem = styled.div<{ src: string }>`
  width: 25px;
  height: 25px;
  cursor: pointer;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const LedgerIconImg = styled.div`
  position: absolute;
  top: 7px;
  left: 195px;
  width: 15px !important;
  height: 15px !important;
  cursor: pointer;
  background: url("${process.env.PUBLIC_URL + `/images/ledger.png`}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LoadingWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #000000bf;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.active ? `` : `display:none`)}
`;

export const SwapIcon = styled.div`
  width: 100%;
  height: 200px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 50px;
  background-image: url("${process.env.PUBLIC_URL + "/images/main.png"}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 15px;
`;

const fadeInout = keyframes`
  0%,80%,100% { opacity: 0; }
  20% { opacity: 1; }
`;

export const ArrowIconFirst = styled.div`
  width: 32px;
  height: 54px;
  background-image: url("${process.env.PUBLIC_URL + `/images/arrow1.png`}");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  animation: ${fadeInout} 2.8s linear 0s infinite;
`;

export const ArrowIconSecond = styled.div`
  width: 32px;
  height: 54px;
  background-image: url("${process.env.PUBLIC_URL + `/images/arrow2.png`}");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  animation: ${fadeInout} 2.8s linear 0.5s infinite;
`;

export const ArrowIconThird = styled.div`
  width: 32px;
  height: 54px;
  background-image: url("${process.env.PUBLIC_URL + `/images/arrow3.png`}");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  animation: ${fadeInout} 2.8s linear 1s infinite;
`;
