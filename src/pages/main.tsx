import React, { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

import { STEP_INTRO, STEP_RESULT, STEP_STATUS } from '../constants/main';
import Footer from '../organisms/footer';
import Header from '../organisms/header';
import Intro from '../organisms/intro';
import { IntroNotice } from '../organisms/modals';
import ResultOrder from '../organisms/resultOrder';
import Status from '../organisms/status';
import Step from '../organisms/step';
import Top from '../organisms/top';
import API from '../utils/api';
import { MainContainer } from './styles';

interface IMainState {
    setStep: (value: number) => void;
    currentStep: number;
}

export const MainContext = React.createContext<IMainState>({
    setStep: () => {},
    currentStep: 0
});

const Main = () => {
    const [currentStep, setStep] = useState(STEP_INTRO);
    const [notice, setNotice] = useState(true);
    const api = API();

    useEffect(() => {
        if (isMobile || isTablet) setNotice(false);
    }, []);

    const toggleModal = (isNotice: boolean) => {
        setNotice(isNotice);
    };

    return (
        <MainContext.Provider value={{ setStep, currentStep }}>
            <MainContainer>
                <IntroNotice
                    visible={notice}
                    onClose={() => {
                        toggleModal(false);
                    }}
                />
                <Header />
                <Top />
                {currentStep === STEP_INTRO && <Intro api={api} />}
                {currentStep === STEP_STATUS && <Status api={api} />}
                {currentStep === STEP_RESULT && <ResultOrder />}
                {currentStep > STEP_INTRO && <Step api={api} />}
                <Footer />
            </MainContainer>
        </MainContext.Provider>
    );
};

export default React.memo(Main);
