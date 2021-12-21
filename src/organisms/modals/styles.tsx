import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
`;

export const ModalTitle = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
`;

export const ModalContent = styled.div`
  width: calc(100% - 10px);
  height: 100%;
  padding: 0 5px;
  font-size: 14px;
`;

export const CopyIcon = styled.svg`
  color: white;
  fill: #fff;
  cursor: pointer;
`;

export const OrderWrapper = styled.div`
  width: 100%;
  line-height: 18px;
  display: flex;
  gap: 7px;
`;

export const InputWrapper = styled.div`
  width: calc(100% - 40px);
  margin-top: 20px;
  margin-bottom: 12px;
  background-color: #292931;
  border-radius: 8px;
  position: relative;
  display: flex;
  padding: 15px 20px;
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

export const InputTypo = styled.div`
  color: #eee;
  margin-bottom: 2px;
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

export const TitleTypo = styled.div`
  text-align: center;
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const SubTypo = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 22px;
`;
