import styled from "styled-components";

export const Step = styled.div`
  width: calc(100% - 60px);
  padding: 30px 30px;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  background-color: #292931;
`;

export const CopyIcon = styled.svg`
  color: white;
  fill: #fff;
  cursor: pointer;
`;

export const BigLabel = styled.div`
  width: 100%;
  font-size: 24px;
  margin-bottom: 25px;
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

export const Card = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding: 12px;
`;

export const InputTypo = styled.div`
  color: #eee;
  margin-bottom: 2px;
`;

export const StatusLink = styled.div`
  font-size: 14px;
  color: #bbb;
  margin-top: 20px;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
`;

export const SubTypo = styled.div`
  text-align: center;
  line-height: 25px;
  color: white;
`;

export const NotiCard = styled.div`
  width: calc(100% - 40px);
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  border: 1px solid #47ec9f;
  border-radius: 4px;
`;

export const NotiTypo = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  color: #47ec9f;
`;

export const NotiAddress = styled.div`
  font-size: 14px;
  text-decoration: underline;
  color: white;
  cursor: pointer;
`;
