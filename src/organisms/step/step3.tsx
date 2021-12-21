import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { userActions } from "../../redux/action";
import { MainContext } from "../../pages/main";
import { STEP_4 } from "../../constants/main";
import { Step, BigLabel, Card, InputWrapper, InputBoxDefault, Label, NextButton } from "./styles";

const Step3 = () => {
  const { ethAddress, amount } = useSelector((state: any) => state.user.order);
  const { setStep } = useContext(MainContext);
  const { enqueueSnackbar } = useSnackbar();
  const [inputEthAddress, setInputEthAddress] = useState(ethAddress);
  const [inputAmount, setInputAmount] = useState(amount);

  const isValidEth = (value: string) => {
    var pattern = new RegExp(/^(0x)?[0-9a-f]{40}$/i);
    return pattern.test(value);
  };

  const onClickNext = () => {
    if (isValidEth(inputEthAddress)) {
      if (Number(inputAmount) > 0) {
        userActions.handleUserOrder({
          ethAddress: inputEthAddress,
          amount: inputAmount,
        });
        setStep(STEP_4);
      } else {
        enqueueSnackbar("Invalid swap amount", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
    } else {
      enqueueSnackbar("Invalid your eth address", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const onChangeEthAddress = (e: any) => {
    if (e === null) return;
    setInputEthAddress(e.target.value);
  };

  const onChangeAmount = (e: any) => {
    if (e === null) return;
    setInputAmount(e.target.value.replace(/(\.\d{6})\d+/g, "$1"));
  };

  const onKeydownAmount = (e: any) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
    }
  };

  return (
    <Step>
      <BigLabel>Input Your Order</BigLabel>
      <Card>
        <InputWrapper>
          <Label>Your ETH Wallet Address</Label>
          <InputBoxDefault placeholder="0x000000" value={inputEthAddress} onChange={onChangeEthAddress} />
        </InputWrapper>
        <InputWrapper>
          <Label>Swap Amount (FCT)</Label>
          <InputBoxDefault
            placeholder="10.000000"
            value={inputAmount}
            onChange={onChangeAmount}
            onKeyDown={onKeydownAmount}
            step="0.1"
            type="number"
          />
        </InputWrapper>
      </Card>
      <NextButton active={true} onClick={onClickNext}>
        NEXT
      </NextButton>
    </Step>
  );
};

export default React.memo(Step3);
