import React, { useContext } from "react";

import { MainContext } from "../../pages/main";
import { STEP_INTRO } from "../../constants/main";

import { HeaderContainer, LogoImage } from "./styles";

const Header = () => {
  const { setStep } = useContext(MainContext);

  return (
    <HeaderContainer>
      <LogoImage onClick={() => setStep(STEP_INTRO)} />
    </HeaderContainer>
  );
};

export default React.memo(Header);
