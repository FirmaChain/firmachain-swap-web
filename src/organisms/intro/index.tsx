import React, { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { FirmaUtil } from "@firmachain/firma-js";

import { MainContext } from "../../pages/main";
import { userActions } from "../../redux/action";
import { STEP_STATUS, STEP_1 } from "../../constants/main";

import {
  IntroContainer,
  SwapIcon,
  SwapButton,
  StatusLink,
  Label,
  InputWrapper,
  InputBoxDefault,
  DownloadWrapper,
  DownloadItem,
} from "./styles";

const Top = () => {
  const { setStep } = useContext(MainContext);
  const { enqueueSnackbar } = useSnackbar();

  const [firmaAddress, setFirmaAddress] = useState("");

  const onClickStart = () => {
    if (FirmaUtil.isValidAddress(firmaAddress)) {
      userActions.handleUserOrder({
        firmaAddress,
      });
      setStep(STEP_1);
    } else {
      enqueueSnackbar("You need a firma wallet address for the swap", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const onChangeFirmaAddress = (e: any) => {
    if (e === null) return;
    setFirmaAddress(e.target.value);
  };

  return (
    <IntroContainer>
      <SwapIcon />
      <InputWrapper>
        <Label>Your Firma Wallet Address</Label>
        <InputBoxDefault placeholder="firmaxxxxxxx" value={firmaAddress} onChange={onChangeFirmaAddress} />
      </InputWrapper>
      <SwapButton onClick={onClickStart}>SWAP START</SwapButton>
      <StatusLink onClick={() => setStep(STEP_STATUS)}>SWAP STATUS</StatusLink>
      <DownloadWrapper>
        <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_win.png"}></DownloadItem>
        <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_mac.png"}></DownloadItem>
        <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_linux.png"}></DownloadItem>
        <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_web.png"}></DownloadItem>
      </DownloadWrapper>
    </IntroContainer>
  );
};

export default React.memo(Top);
