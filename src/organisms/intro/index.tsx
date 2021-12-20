import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useSnackbar } from "notistack";

import { FirmaUtil } from "@firmachain/firma-js";
import { MainContext } from "../../pages/main";
import { userActions } from "../../redux/action";
import { STEP_STATUS, STEP_1 } from "../../constants/main";
import { getAddress } from "../../utils/ledger";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  LoadingWrapper,
  IntroContainer,
  SwapIcon,
  ArrowIconFirst,
  ArrowIconSecond,
  ArrowIconThird,
  SwapButton,
  StatusLink,
  Label,
  InputWrapper,
  InputBoxDefault,
  DownloadWrapper,
  DownloadItem,
  LedgerIconImg,
} from "./styles";

const Top = () => {
  const { setStep } = useContext(MainContext);
  const { enqueueSnackbar } = useSnackbar();

  const [firmaAddress, setFirmaAddress] = useState("");
  const [isLoading, setLoading] = useState(false);
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

  const linktoWeb = () => {
    window.open(process.env.REACT_APP_STATION_HOST);
  };

  const getAddressByLedger = () => {
    setLoading(true);
    getAddress()
      .then((result) => {
        setLoading(false);
        if (result === undefined || result === "") {
          enqueueSnackbar("Failed get address from ledger", {
            variant: "error",
            autoHideDuration: 1500,
          });
        } else {
          enqueueSnackbar("Success get address from ledger", {
            variant: "success",
            autoHideDuration: 1500,
          });
          setFirmaAddress(result);
        }
      })
      .catch((e) => {
        setLoading(false);
        enqueueSnackbar("Failed connect to ledger", {
          variant: "error",
          autoHideDuration: 1500,
        });
      });
  };

  return (
    <>
      <LoadingWrapper active={isLoading}>
        <Loader type="MutatingDots" color="#0080c4" secondaryColor="#00d8ff" height={100} width={100} />
      </LoadingWrapper>
      <IntroContainer>
        <SwapIcon>
          <ArrowIconFirst />
          <ArrowIconSecond />
          <ArrowIconThird />
        </SwapIcon>
        <InputWrapper>
          <Label>Your Firma Wallet Address</Label>
          <LedgerIconImg onClick={getAddressByLedger} />
          <InputBoxDefault placeholder="firmaxxxxxxx" value={firmaAddress} onChange={onChangeFirmaAddress} />
        </InputWrapper>
        <SwapButton onClick={onClickStart}>SWAP START</SwapButton>
        <StatusLink onClick={() => setStep(STEP_STATUS)}>SWAP STATUS</StatusLink>
        <DownloadWrapper>
          <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_win.png"} onClick={downloadWin}></DownloadItem>
          <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_mac.png"} onClick={downloadMac}></DownloadItem>
          <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_linux.png"} onClick={downloadLinux}></DownloadItem>
          <DownloadItem src={process.env.PUBLIC_URL + "/images/icon_web.png"} onClick={linktoWeb}></DownloadItem>
        </DownloadWrapper>
      </IntroContainer>
    </>
  );
};

export default React.memo(Top);
