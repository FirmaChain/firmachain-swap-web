import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ProgressLineList = styled.div`
  width: calc(100% - 20px);
  margin: 0 10px;
  height: 70px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
`;

export const ProgressLine = styled.div<{ active?: boolean }>`
  width: 100%;
  height: 1px;
  margin-top: 30px;
  background-color: ${(props) => (props.active ? "#5bb28e" : "#808080")};
  z-index: 1;
`;

export const ProgressList = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

export const ProgressWrapper = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
`;

export const ProgressCircle = styled.div<{ active?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "#2BB26F" : "#999")};
  text-align: center;
  margin: auto;
`;

export const ProgressCheck = styled.div<{ active?: boolean }>`
  width: 12px;
  height: 12px;
  margin: 10px;
  display: ${(props) => (props.active ? "block" : "none")};
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABn0lEQVRYhb3WIWhVURzH8cOQMcZYEDEMMRgMQ4xLJhkmMYjIgmkYDQtjiNjMCwYxyTCJyWQUWTAZjAumYXhhGAzyGI/xWbj36ZX5zv/w9s795XP+3+//3PPn3JR6ClZwB0t9MbvwKzjS5BDrfcLn8Nm/OcEu5vsQ2DY572vDb2CYERjMVYTPp5TeppQWMste1+InvMh0Dt+q3QGsYZSBH+NmLfgCDoLun1eBtwK7AfwrLtSC39LM+KQMsVoLvoTvQffbVeCtwKsA/gV1xh7rwdH/xvVa8GXNA5PLk5JCi9jT3NLi1wpvAvin8Og1F2i/s2mIewXwuwH8F66WdL7/n83HuJ/ZdxGDQGAzaiLhXabACA+n2AcfEfITfgSFzkjgQbDnJ1ZielNsU36ExhIb7frL/v5eTcpGEbwjsRUU/COBD8G66f5y5H+dxolOaoBLUwm0Ek8LJHIJR7dE4tmU8L1zw88hcYjlmQm0EqWf4wS3ZwrvSOwUCLysAu9I5KbjAItVBVqJLWdHcIS16vCOxGPNAzXOTm/wjsQ1PJpl56fdzGyIIst1RwAAAABJRU5ErkJggg==");
`;

export const ProgressText = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: white;
`;
