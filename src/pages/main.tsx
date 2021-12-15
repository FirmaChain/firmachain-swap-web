import React, { useState } from "react";

import Header from "../organisms/header";
import Top from "../organisms/top";
import Intro from "../organisms/intro";
import Status from "../organisms/status";
import Step from "../organisms/step";

import { STEP_INTRO, STEP_STATUS } from "../constants/main";

import { MainContainer } from "./styles";

interface IMainState {
  setStep: (value: number) => void;
  currentStep: number;
}

export const MainContext = React.createContext<IMainState>({
  setStep: () => {},
  currentStep: 0,
});

const Main = () => {
  const [currentStep, setStep] = useState(0);

  return (
    <MainContainer>
      <MainContext.Provider value={{ setStep, currentStep }}>
        <Header />
        <Top />
        {currentStep === STEP_INTRO && <Intro />}
        {currentStep === STEP_STATUS && <Status />}
        {currentStep > STEP_INTRO && <Step />}
      </MainContext.Provider>
    </MainContainer>
  );
};

export default React.memo(Main);
