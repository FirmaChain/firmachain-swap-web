import React, { useContext, useState } from 'react';
import { STEP_2 } from '@/constants/main';
import { MainContext } from '@/pages/main';
import { terms } from '@/terms';

import Checkbox from '@/components/checkbox';

import { BigLabel, Card, NextButton, Step, TermText } from './styles';

const Step1 = () => {
    const { setStep } = useContext(MainContext);
    const [activeStep1Next, setActiveStep1] = useState(false);

    const onClickCheckBox = () => {
        setActiveStep1(!activeStep1Next);
    };

    const onClickNext = () => {
        setStep(STEP_2);
    };

    return (
        <Step>
            <BigLabel>Terms and Conditions</BigLabel>
            <Card>
                <TermText>{terms}</TermText>
                <Checkbox checked={activeStep1Next} onClickCheckBox={onClickCheckBox}>
                    I agree with the Terms and Conditions
                </Checkbox>
            </Card>
            <NextButton active={activeStep1Next} onClick={onClickNext}>
                NEXT
            </NextButton>
        </Step>
    );
};

export default React.memo(Step1);
