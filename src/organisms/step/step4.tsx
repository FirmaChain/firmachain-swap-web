import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { MainContext } from "../../pages/main";
import { STEP_3 } from "../../constants/main";
import { Step, BigLabel, Card, InputWrapper, InputTypo, Label, NextButton, BackButton } from "./styles";

const Step4 = ({ toggleModal }: any) => {
  const { firmaAddress, ethAddress, amount, orderId, emailAddress } = useSelector((state: any) => state.user.order);
  const { setStep } = useContext(MainContext);

  const showConfirmModal = () => {
    toggleModal(true);
  };

  const onClickConfirmModal = () => {
    showConfirmModal();
  };

  const onClickBack = () => {
    setStep(STEP_3);
  };

  return (
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
          <InputTypo>{emailAddress ? emailAddress : "-"}</InputTypo>
        </InputWrapper>

        <InputWrapper>
          <Label>Order Id</Label>
          <InputTypo>{orderId}</InputTypo>
        </InputWrapper>
      </Card>
      <NextButton active={true} onClick={onClickConfirmModal}>
        CONFIRM
      </NextButton>
      <BackButton active={true} onClick={onClickBack}>
        BACK
      </BackButton>
    </Step>
  );
};

export default React.memo(Step4);
