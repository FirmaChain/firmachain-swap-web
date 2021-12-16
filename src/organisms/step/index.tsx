import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

import { convertNumber } from "../../utils/common";
import { MainContext } from "../../pages/main";
import { STEP_1, STEP_2, STEP_3, STEP_RESULT } from "../../constants/main";
import { terms } from "../../terms";
import { userActions } from "../../redux/action";

import { ConfirmModal } from "../modals";

import Progressbar from "../../components/progressbar";
import Checkbox from "../../components/checkbox";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  LoadingWrapper,
  StepWrapper,
  StepList,
  Step,
  BigLabel,
  Label,
  TermText,
  NextButton,
  BackButton,
  InputWrapper,
  InputBoxDefault,
  NotiCard,
  Card,
  InputTypo,
} from "./styles";

const Main = () => {
  const { setStep, currentStep } = useContext(MainContext);
  const [confirmModal, toggleModal] = useState(false);

  const [checked, setChecked] = useState(false);
  const [activeStep2Next, setActiveStep2Next] = useState(false);
  const [firmaAddress, setFirmaAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setActiveStep2Next(firmaAddress.length === 44 && ethAddress.length === 42 && convertNumber(amount) > 0);
  }, [firmaAddress, ethAddress, amount]);

  useEffect(() => {
    setOrderId(generateOrderId());
  }, []);

  const generateOrderId = () => {
    return (
      "order" +
      Math.floor(new Date().valueOf() * Math.random())
        .toString()
        .padStart(40, Math.random().toString(36).substr(2, 11))
    );
  };

  const onClickCheckBox = () => {
    setChecked(!checked);
  };

  const onChangeFirmaAddress = (e: any) => {
    if (e === null) return;
    setFirmaAddress(e.target.value);
  };

  const onChangeEthAddress = (e: any) => {
    if (e === null) return;
    setEthAddress(e.target.value);
  };

  const onChangeAmount = (e: any) => {
    if (e === null) return;
    setAmount(e.target.value.replace(/(\.\d{6})\d+/g, "$1"));
  };

  const onChangeKeyDown = (e: any) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
    }
  };

  const onChangeEmailAddress = (e: any) => {
    if (e === null) return;
    setEmailAddress(e.target.value);
  };

  const showConfirmModal = () => {
    toggleModal(true);
  };

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
          {currentStep === STEP_1 && (
            <Step>
              <BigLabel>Terms and Conditions</BigLabel>
              <Card>
                <TermText>{terms}</TermText>
                <Checkbox checked={checked} onClickCheckBox={onClickCheckBox}>
                  I agree with the Terms and Conditions
                </Checkbox>
              </Card>
              <NextButton active={checked} onClick={() => setStep(STEP_2)}>
                NEXT
              </NextButton>
            </Step>
          )}
          {currentStep === STEP_2 && (
            <Step>
              <BigLabel>Input Your Order</BigLabel>
              <Card>
                <InputWrapper>
                  <Label>Your ETH Wallet Address</Label>
                  <InputBoxDefault placeholder="0x000000" value={ethAddress} onChange={onChangeEthAddress} />
                </InputWrapper>

                <InputWrapper>
                  <Label>Your Firma Wallet Address</Label>
                  {/* <LedgerButton>Ledger</LedgerButton> */}
                  <InputBoxDefault placeholder="firmaxxxxxx" value={firmaAddress} onChange={onChangeFirmaAddress} />
                </InputWrapper>

                <InputWrapper>
                  <Label>Swap Amount (FCT)</Label>
                  <InputBoxDefault
                    placeholder="10.000000"
                    value={amount}
                    onChange={onChangeAmount}
                    onKeyDown={onChangeKeyDown}
                    step="0.1"
                    type="number"
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label>Your Email Address (Optional)</Label>
                  <InputBoxDefault value={emailAddress} onChange={onChangeEmailAddress} />
                  <NotiCard>
                    If you provide your e-mail to us you can receive progress updates on token swap and other related
                    issues.
                  </NotiCard>
                </InputWrapper>
              </Card>
              <NextButton active={activeStep2Next} onClick={() => activeStep2Next && setStep(STEP_3)}>
                NEXT
              </NextButton>
            </Step>
          )}
          {currentStep === STEP_3 && (
            <Step>
              <BigLabel>Confirm Your Order</BigLabel>
              <Card>
                <InputWrapper>
                  <Label>From (ETH)</Label>
                  <InputTypo>{ethAddress}</InputTypo>
                </InputWrapper>
                <InputWrapper>
                  <Label>To (FirmaChain)</Label>
                  <InputTypo>{firmaAddress}</InputTypo>
                </InputWrapper>
                <InputWrapper>
                  <Label>Amount</Label>
                  <InputTypo>{`${amount} FCT`}</InputTypo>
                </InputWrapper>
                <InputWrapper>
                  <Label>Email</Label>
                  <InputTypo>{emailAddress}</InputTypo>
                </InputWrapper>

                <InputWrapper>
                  <Label>Order Id</Label>
                  <InputTypo>{orderId}</InputTypo>
                </InputWrapper>
              </Card>
              <NextButton active={true} onClick={() => showConfirmModal()}>
                CONFIRM
              </NextButton>
              <BackButton active={true} onClick={() => setStep(STEP_2)}>
                BACK
              </BackButton>
            </Step>
          )}
        </StepList>
      </StepWrapper>
    </>
  );
};

export default React.memo(Main);
