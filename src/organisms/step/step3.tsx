import React, { useState, useContext, useEffect } from "react";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Metamask from "../../utils/metamask";
import { userActions } from "../../redux/action";
import { MainContext } from "../../pages/main";
import { STEP_RESULT } from "../../constants/main";
import {
  Step,
  Card,
  InputWrapper,
  InputBoxDefault,
  Label,
  MetamaskWrapper,
  MetamaskTypo,
  MetamaskInstallWrapper,
  MetamaskIcon,
  NextButton,
} from "./styles";

declare let window: any;

const Step3 = ({ setLoading, api }: any) => {
  const { firmaAddress, orderId, emailAddress, tokenData } = useSelector((state: any) => state.user.order);
  const { setStep } = useContext(MainContext);
  const { enqueueSnackbar } = useSnackbar();

  const [inputEthAddress, setInputEthAddress] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [isConnected, setConnect] = useState(false);
  const [isActiveSwap, setActiveSwap] = useState(false);
  const [isProcessInstall, setProcessInstall] = useState(false);

  const { installed, connect, getChainId, getEthAddress, transferForSwap, balanceOfFCT } = Metamask();

  useEffect(() => {
    setActiveSwap(Number(inputAmount) > 0);
  }, [inputAmount]);

  const onClickSwap = async () => {
    if (Number(inputAmount) > 0 && Number(inputAmount) <= Number(balance)) {
      setLoading(true);

      try {
        const ethTxHash = await transferForSwap(inputAmount);

        api
          .insertOrder(tokenData, orderId, inputEthAddress, firmaAddress, Number(inputAmount), ethTxHash, emailAddress)
          .then(() => {
            userActions.handleUserOrder({
              ethAddress: inputEthAddress,
              amount: inputAmount,
              txHash: ethTxHash,
            });

            enqueueSnackbar("Registration successful", {
              variant: "success",
              autoHideDuration: 1500,
            });

            setStep(STEP_RESULT);
          })
          .catch(() => {
            enqueueSnackbar("Invalid Request", {
              variant: "error",
              autoHideDuration: 3000,
            });

            setTimeout(() => {
              window.location.reload();
            }, 3000);
          });
      } catch (e) {
        setLoading(false);
        enqueueSnackbar("Failed registration", {
          variant: "error",
          autoHideDuration: 1500,
        });
      }
    } else {
      enqueueSnackbar("Invalid swap amount", {
        variant: "error",
        autoHideDuration: 1500,
      });
      setInputAmount(balance);
    }
  };

  const updateMetamaskUserInfo = async () => {
    const balance = await balanceOfFCT();
    const address = await getEthAddress();

    setInputAmount(`${balance}`.replace(/(\.\d{6})\d+/g, "$1"));
    setBalance(`${balance}`.replace(/(\.\d{6})\d+/g, "$1"));

    if (typeof address == "string") {
      setInputEthAddress(address + "");
    } else {
      setInputEthAddress("");
    }
  };

  const updateChainInfo = async () => {
    if ((await getChainId()) === process.env.REACT_APP_TARGET_ETH_CHAIN_ID) {
      await updateMetamaskUserInfo();
    } else {
      throw new Error("INVALID CHAIN ID");
    }
  };

  const onChangeMetamask = (isLoading = true) => {
    if (isLoading) setLoading(true);

    updateChainInfo()
      .then(() => {
        setConnect(true);
        setLoading(false);
      })
      .catch(() => {
        setConnect(false);
        setLoading(false);
        enqueueSnackbar("Please check Metamask network", {
          variant: "error",
          autoHideDuration: 1500,
        });
      });
  };

  const onClickConnectMetamask = async () => {
    try {
      setLoading(true);

      if (installed()) {
        await connect(onChangeMetamask);
        onChangeMetamask(false);
      } else {
        window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn");
        setProcessInstall(true);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      enqueueSnackbar("Please connect to Metamask", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
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
      {isConnected ? (
        <>
          <Card>
            <InputWrapper>
              <Label>Your ETH Wallet Address</Label>
              <InputBoxDefault value={inputEthAddress} readOnly />
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
          <NextButton active={isActiveSwap} onClick={onClickSwap}>
            SEND FOR SWAP
          </NextButton>
        </>
      ) : (
        <>
          <MetamaskWrapper>
            <MetamaskTypo>Metamask</MetamaskTypo>
            <MetamaskIcon />
          </MetamaskWrapper>
          {isProcessInstall === false ? (
            <NextButton active={true} onClick={onClickConnectMetamask}>
              CONNECT
            </NextButton>
          ) : (
            <>
              <NextButton
                active={true}
                onClick={() => {
                  window.location.reload();
                }}
              >
                BACK TO MAIN
              </NextButton>
              <MetamaskInstallWrapper>
                <MetamaskTypo>After installing MetaMask,</MetamaskTypo>
                <MetamaskTypo>please click on the [Back to main] button before token swap.</MetamaskTypo>
              </MetamaskInstallWrapper>
            </>
          )}
        </>
      )}
    </Step>
  );
};

export default React.memo(Step3);
