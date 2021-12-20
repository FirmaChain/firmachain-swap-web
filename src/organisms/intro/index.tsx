import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
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
  const [downloadURLData, setDownloadURLData] = useState({ win: "", mac: "", linux: "" });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/stations/release/latest`)
      .then((res) => {
        setDownloadURLData({
          win: res.data.result.urlList.win,
          mac: res.data.result.urlList.mac,
          linux: res.data.result.urlList.linux,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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

  const downloadWin = () => {
    window.open(downloadURLData.win);
  };

  const downloadMac = () => {
    window.open(downloadURLData.mac);
  };

  const downloadLinux = () => {
    window.open(downloadURLData.linux);
  };

  const LinktoWeb = () => {
    window.open(process.env.REACT_APP_STATION_HOST);
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
        <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_win.png"} onClick={downloadWin}></DownloadItem>
        <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_mac.png"} onClick={downloadMac}></DownloadItem>
        <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_linux.png"} onClick={downloadLinux}></DownloadItem>
        <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_web.png"} onClick={LinktoWeb}></DownloadItem>
      </DownloadWrapper>
    </IntroContainer>
  );
};

export default React.memo(Top);
