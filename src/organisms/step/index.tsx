import React, { useContext, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { MainContext } from "../../pages/main";
import { STEP_1, STEP_2, STEP_3, STEP_4, STEP_RESULT } from "../../constants/main";
import { userActions } from "../../redux/action";

import { ConfirmModal } from "../modals";

import Progressbar from "../../components/progressbar";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { LoadingWrapper, StepWrapper, StepList } from "./styles";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";

const Main = () => {
  const { firmaAddress, ethAddress, amount, orderId, emailAddress } = useSelector((state: any) => state.user.order);
  const { setStep, currentStep } = useContext(MainContext);

  const [confirmModal, toggleModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const confirmSwap = () => {
    setLoading(true);
    toggleModal(false);

    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/swaps`,
        { orderId, ethAddress, firmaAddress, amount: Number(amount), email: emailAddress },
        { headers: { "Content-Type": `application/json` } }
      )
      .then((res) => {
        setTimeout(() => {
          userActions.handleUserOrder({
            orderId,
            ethAddress,
            firmaAddress,
            amount,
            emailAddress,
          });
          setLoading(false);
          setStep(STEP_RESULT);
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <LoadingWrapper active={isLoading}>
        <Loader type="MutatingDots" color="#0080c4" secondaryColor="#00d8ff" height={100} width={100} />
      </LoadingWrapper>
      <ConfirmModal
        visible={confirmModal}
        onClose={() => {
          toggleModal(false);
        }}
        orderId={orderId}
        amount={amount}
        confirmAction={confirmSwap}
      />
      <StepWrapper>
        <Progressbar currentStep={currentStep} />
        <StepList>
          {currentStep === STEP_1 && <Step1 />}
          {currentStep === STEP_2 && <Step2 setLoading={setLoading} />}
          {currentStep === STEP_3 && <Step3 />}
          {currentStep === STEP_4 && <Step4 toggleModal={toggleModal} />}
        </StepList>
      </StepWrapper>
    </>
  );
};

export default React.memo(Main);
