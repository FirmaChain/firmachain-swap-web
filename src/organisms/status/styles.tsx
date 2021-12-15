import styled from "styled-components";

export const StatusContainer = styled.div`
  width: 100%;
  min-height: 700px;
  margin-bottom: 30px;
`;

export const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
`;

export const Column = styled.div`
  width: 100%;
  & {
    flex: 1 1 100%;
    text-align: center;
  }
`;

export const HeaderWrapper = styled(RowWrapper)`
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #444;
`;

export const HeaderColumn = styled(Column)`
  color: white;
`;

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  border-bottom: 1px solid #444;
`;

export const ItemColumn = styled(Column)`
  height: 40px;
  padding: 5px 0;
  line-height: 40px;
  font-size: 12px;
  color: white;
  &:nth-child(5) {
    line-height: 20px;
  }
  & > a {
    text-decoration: none !important;
    font-weight: 300 !important;
  }
  & > a:hover {
    background: none;
    font-weight: 500 !important;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  margin-top: 70px;
  &:first-child {
    & > div {
      margin-top: 0;
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

export const Label = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  margin-top: 40px;
  margin-bottom: 10px;
  color: #999;
`;

export const StatusTypo = styled.span<{ color?: string }>`
  ${(props) => props.color && `color:${props.color};`}
  font-weight:600;
`;

export const SearchButton = styled.div<{ active: boolean }>`
  width: 144px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin: 20px auto 50px auto;
  color: white;
  background-color: #3550de;
  border-radius: 20px;
  cursor: pointer;
  ${(props) => (props.active ? `` : `background-color: #444;color:#777`)}
`;
