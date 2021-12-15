import React, { useState } from "react";

import Header from "../organisms/header";
import Top from "../organisms/top";
import Intro from "../organisms/intro";
import Status from "../organisms/status";
import Step from "../organisms/step";
import ResultOrder from "../organisms/resultOrder";

import { STEP_INTRO, STEP_STATUS, STEP_RESULT } from "../constants/main";

import { MainContainer, TestWrapper } from "./styles";

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
      <TestWrapper>
        <MainContext.Provider value={{ setStep, currentStep }}>
          <Header />
          <Top />
          {currentStep === STEP_INTRO && <Intro />}
          {currentStep === STEP_STATUS && <Status />}
          {currentStep === STEP_RESULT && <ResultOrder />}
          {currentStep > STEP_INTRO && <Step />}
        </MainContext.Provider>
      </TestWrapper>
    </MainContainer>
  );
};

export default React.memo(Main);
