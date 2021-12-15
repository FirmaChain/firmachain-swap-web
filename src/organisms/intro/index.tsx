import React, { useContext } from "react";
import { MainContext } from "../../pages/main";
import { STEP_STATUS, STEP_1 } from "../../constants/main";

import { IntroContainer, SwapIcon, SwapButton, StatusLink } from "./styles";

const Top = () => {
  const { setStep } = useContext(MainContext);

  return (
    <IntroContainer>
      <SwapIcon />
      <SwapButton onClick={() => setStep(STEP_1)}>SWAP START</SwapButton>
      <StatusLink onClick={() => setStep(STEP_STATUS)}>SWAP STATUS</StatusLink>
    </IntroContainer>
  );
};

export default React.memo(Top);
