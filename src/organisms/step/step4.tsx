import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { MainContext } from "../../pages/main";
import { STEP_3 } from "../../constants/main";
import {
  Step,
  BigLabel,
  Card,
  InputWrapper,
  InputTypo,
  Label,
  NextButton,
  BackButton,
  Typo,
  CheckIcon,
  CheckBoxRound,
} from "./styles";

const Step4 = ({ toggleModal }: any) => {
  const { firmaAddress, ethAddress, amount, orderId, emailAddress } = useSelector((state: any) => state.user.order);
  const { enqueueSnackbar } = useSnackbar();
  const { setStep } = useContext(MainContext);

  useEffect(() => {
    setTimeout(() => {
      enqueueSnackbar("Validation complete", {
        variant: "success",
        autoHideDuration: 1000,
      });
    }, 500);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          <InputTypo>
            <Typo>{ethAddress}</Typo>
            <CheckIcon>
              <CheckBoxRound />
            </CheckIcon>
          </InputTypo>
        </InputWrapper>
        <InputWrapper>
          <Label>To (FirmaChain)</Label>
          <InputTypo>
            <Typo>{firmaAddress}</Typo>
            <CheckIcon>
              <CheckBoxRound />
            </CheckIcon>
          </InputTypo>
        </InputWrapper>
        <InputWrapper>
          <Label>Amount</Label>
          <InputTypo>
            <Typo> {`${amount} FCT`}</Typo>
            <CheckIcon>
              <CheckBoxRound />
            </CheckIcon>
          </InputTypo>
        </InputWrapper>
        <InputWrapper>
          <Label>Email</Label>
          <InputTypo>
            <Typo>{emailAddress}</Typo>
            <CheckIcon>
              <CheckBoxRound />
            </CheckIcon>
          </InputTypo>
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
