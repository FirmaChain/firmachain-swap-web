import React from "react";
import { Icon, CheckBoxContainer, CheckBoxTypo, StyledCheckBox } from "./styles";

const CheckBox = ({ checked, onClickCheckBox, children }: any) => {
  return (
    <CheckBoxContainer onClick={() => onClickCheckBox()}>
      <StyledCheckBox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="19 7 10 17 5 12" />
        </Icon>
      </StyledCheckBox>
      <CheckBoxTypo>{children}</CheckBoxTypo>
    </CheckBoxContainer>
  );
};

export default React.memo(CheckBox);
