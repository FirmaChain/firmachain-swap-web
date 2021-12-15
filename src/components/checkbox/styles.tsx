import styled from "styled-components";

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const CheckBoxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-top: 10px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const CheckBoxTypo = styled.div`
  height: 20px;
  color: #eee;
  margin-left: 10px;
  line-height: 20px;
  float: left;
  font-size: 13px;
`;

export const StyledCheckBox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  float: left;
  background: ${(props) => (props.checked ? "#2BB26F" : "white")};
  border-radius: 4px;
  transition: all 150ms;
  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
