import React, { useContext, useState } from 'react';
import { STEP_1, STEP_2, STEP_3 } from '@/constants/main';
import { MainContext } from '@/pages/main';
import Loader from 'react-loader-spinner';

import Progressbar from '@/components/progressbar';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import { LoadingWrapper, StepList, StepWrapper } from './styles';

const Step = ({ api }: any) => {
    const { currentStep } = useContext(MainContext);

    const [isLoading, setLoading] = useState(false);

    return (
        <>
            <LoadingWrapper active={isLoading}>
                <Loader type="MutatingDots" color="#0080c4" secondaryColor="#00d8ff" height={100} width={100} />
            </LoadingWrapper>
            <StepWrapper>
                <Progressbar currentStep={currentStep} />
                <StepList>
                    {currentStep === STEP_1 && <Step1 />}
                    {currentStep === STEP_2 && <Step2 setLoading={setLoading} api={api} />}
                    {currentStep === STEP_3 && <Step3 setLoading={setLoading} api={api} />}
                </StepList>
            </StepWrapper>
        </>
    );
};

export default React.memo(Step);
