import styled, { keyframes } from "styled-components";

const slidein = keyframes`
from {
  margin-left: 100%;
}
to {
  margin-left: 0%;
}
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

export const StepWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  margin-bottom: 30px;
`;

export const StepList = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

export const Step = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: ${slidein} 0.2s;
`;

export const BigLabel = styled.div`
  width: 100%;
  font-size: 16px;
  margin-bottom: 5px;
  color: #eee;
`;

export const Label = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  margin-bottom: 5px;
  color: #999;
`;

export const TermText = styled.div`
  width: calc(100% - 22px);
  height: 200px;
  border: 1px solid #888;
  line-height: 25px;
  padding: 10px;
  color: #808080;
  overflow-y: scroll;
`;

export const NextButton = styled.div<{ active: boolean }>`
  width: 144px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin: 20px auto 0 auto;
  color: white;
  font-size: 14px;
  background-color: #3550de;
  border-radius: 20px;
  cursor: pointer;
  font-family: "Chakra" !important;
  ${(props) => (props.active ? `` : `background-color: #444;color:#777`)}
`;

export const BackButton = styled.div<{ active: boolean }>`
  width: 144px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin: 14px auto 0 auto;
  color: white;
  font-size: 14px;
  background-color: #3550de80;
  border-radius: 20px;
  cursor: pointer;
  font-family: "Chakra" !important;
  ${(props) => (props.active ? `` : `background-color: #444;color:#777`)}
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  &:first-child {
    & > div {
    }
  }
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

export const NotiCard = styled.div`
  width: calc(100% - 20px);
  line-height: 30px;
  padding: 3px 10px;
  margin: 10px 0 0 0;
  color: #47ec9faa;
  font-size: 12px;
  background-color: none;
  border: 1px solid #47ec9fcc;
  border-radius: 4px;
`;

export const Card = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding: 12px;
`;

export const InputTypo = styled.div`
  margin-bottom: 2px;
  height: 18px;
  line-height: 18px;
  display: flex;
  color: #eee;
`;

export const Typo = styled.div`
  margin-right: 10px;
`;

export const CheckIcon = styled.div`
  width: 8px;
  height: 8px;
  padding: 4px;
  border-radius: 10px;
  background-color: #2bb26f;
`;

export const CheckBoxRound = styled.div`
  width: 8px;
  height: 8px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABn0lEQVRYhb3WIWhVURzH8cOQMcZYEDEMMRgMQ4xLJhkmMYjIgmkYDQtjiNjMCwYxyTCJyWQUWTAZjAumYXhhGAzyGI/xWbj36ZX5zv/w9s795XP+3+//3PPn3JR6ClZwB0t9MbvwKzjS5BDrfcLn8Nm/OcEu5vsQ2DY572vDb2CYERjMVYTPp5TeppQWMste1+InvMh0Dt+q3QGsYZSBH+NmLfgCDoLun1eBtwK7AfwrLtSC39LM+KQMsVoLvoTvQffbVeCtwKsA/gV1xh7rwdH/xvVa8GXNA5PLk5JCi9jT3NLi1wpvAvin8Og1F2i/s2mIewXwuwH8F66WdL7/n83HuJ/ZdxGDQGAzaiLhXabACA+n2AcfEfITfgSFzkjgQbDnJ1ZielNsU36ExhIb7frL/v5eTcpGEbwjsRUU/COBD8G66f5y5H+dxolOaoBLUwm0Ek8LJHIJR7dE4tmU8L1zw88hcYjlmQm0EqWf4wS3ZwrvSOwUCLysAu9I5KbjAItVBVqJLWdHcIS16vCOxGPNAzXOTm/wjsQ1PJpl56fdzGyIIst1RwAAAABJRU5ErkJggg==");
`;

export const MetamaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MetamaskInstallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const MetamaskTypo = styled.div`
  color: white;
  line-height: 25px;
`;

export const MetamaskIcon = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px 0 10px 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("${process.env.PUBLIC_URL + `/images/metamask.png`}");
`;
