import React from "react";

import { STEP_1, STEP_2, STEP_3, STEP_4 } from "../../constants/main";

import {
  ProgressBarContainer,
  ProgressLineList,
  ProgressLine,
  ProgressList,
  ProgressWrapper,
  ProgressCircle,
  ProgressCheck,
  ProgressText,
} from "./styles";

const ProgressBar = ({ currentStep }: any) => {
  return (
    <ProgressBarContainer>
      <ProgressLineList>
        <ProgressLine active={currentStep >= STEP_2} />
        <ProgressLine active={currentStep >= STEP_3} />
        <ProgressLine active={currentStep >= STEP_4} />
      </ProgressLineList>
      <ProgressList>
        <ProgressWrapper>
          <ProgressCircle active={currentStep >= STEP_1}>
            <ProgressCheck active={currentStep >= STEP_2} />
          </ProgressCircle>
          <ProgressText>Step 1</ProgressText>
        </ProgressWrapper>
        <ProgressWrapper>
          <ProgressCircle active={currentStep >= STEP_2}>
            <ProgressCheck active={currentStep >= STEP_3} />
          </ProgressCircle>
          <ProgressText>Step 2</ProgressText>
        </ProgressWrapper>
        <ProgressWrapper>
          <ProgressCircle active={currentStep >= STEP_3}>
            <ProgressCheck active={currentStep > STEP_3} />
          </ProgressCircle>
          <ProgressText>Step 3</ProgressText>
        </ProgressWrapper>
        <ProgressWrapper>
          <ProgressCircle active={currentStep >= STEP_4}>
            <ProgressCheck active={currentStep > STEP_4} />
          </ProgressCircle>
          <ProgressText>Step 4</ProgressText>
        </ProgressWrapper>
      </ProgressList>
    </ProgressBarContainer>
  );
};

export default React.memo(ProgressBar);
