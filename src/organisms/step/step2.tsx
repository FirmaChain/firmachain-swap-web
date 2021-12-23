import React, { useState, useContext, useCallback, useRef, useEffect } from "react";
import { useSnackbar } from "notistack";

import API from "../../utils/api";
import { userActions } from "../../redux/action";
import { MainContext } from "../../pages/main";
import { STEP_3 } from "../../constants/main";
import { Step, BigLabel, Card, InputWrapper, InputBoxDefault, Label, NextButton } from "./styles";

const useCounter = (initialValue: number, ms: number) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef: any = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => {
    setCount(0);
    stop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { count, start, stop, reset };
};

const Step2 = ({ setLoading }: any) => {
  const { setStep } = useContext(MainContext);

  const { getIsVerified, sendVerificationMail } = API();
  const { enqueueSnackbar } = useSnackbar();
  const [inputEmail, setInputEmail] = useState("");
  const [inputAuthCode, setInputAuthCode] = useState("");
  const [countDownText, setCountDownText] = useState("");
  const [isActiveSend, setActiveSend] = useState(true);
  const [isActiveNext, setActiveNext] = useState(false);
  const [isSent, setSent] = useState(false);

  const { count, start, reset } = useCounter(0, 1000);

  const timer = 180;

  useEffect(() => {
    setCountDownText((timer - count).toString());

    if (count === timer) {
      reset();
      setActiveSend(true);
    }
  }, [count]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveNext(inputAuthCode.length > 0);
  }, [inputAuthCode]);

  const isValidEmail = (value: string) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(value);
  };

  const isVerified = async () => {
    try {
      const result = await getIsVerified(inputEmail, inputAuthCode);
      return result.data.result;
    } catch (e) {
      return false;
    }
  };

  const onClickNext = () => {
    if (isSent && inputAuthCode.length > 0) {
      isVerified()
        .then((isverified) => {
          if (isverified) {
            userActions.handleUserOrder({
              emailAddress: inputEmail,
            });
            reset();
            setStep(STEP_3);
          } else {
            enqueueSnackbar("Invalid Authentication Code", {
              variant: "error",
              autoHideDuration: 1000,
            });
          }
        })
        .catch((e) => {
          enqueueSnackbar("Failed Check Authentication Code. Please try again.", {
            variant: "error",
            autoHideDuration: 1000,
          });
        });
    } else {
      enqueueSnackbar("Invalid Authentication Code", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const sendEmail = async () => {
    await sendVerificationMail(inputEmail);
  };

  const onClickSend = () => {
    if (isActiveSend) {
      if (isValidEmail(inputEmail)) {
        setLoading(true);
        sendEmail()
          .then(() => {
            setLoading(false);
            setActiveSend(false);
            setSent(true);
            start();
            enqueueSnackbar("Email has been sent", {
              variant: "success",
              autoHideDuration: 1000,
            });
          })
          .catch(() => {
            setLoading(false);
            enqueueSnackbar("Failed send email. Please try again.", {
              variant: "error",
              autoHideDuration: 1000,
            });
          });
      } else {
        enqueueSnackbar("Invalid your email", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
    } else {
      enqueueSnackbar("You can send it once a minute.", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const onChangeEmailAddress = (e: any) => {
    if (e === null) return;
    setInputEmail(e.target.value);
  };

  const onChangeAuthCode = (e: any) => {
    if (e === null) return;
    setInputAuthCode(e.target.value);
  };

  return (
    <Step>
      <BigLabel>Email Verification</BigLabel>
      <Card>
        <InputWrapper>
          <Label>Email Address</Label>
          <InputBoxDefault value={inputEmail} onChange={onChangeEmailAddress} />
        </InputWrapper>
        {isSent && (
          <InputWrapper>
            <Label>Authentication Code</Label>
            <InputBoxDefault value={inputAuthCode} onChange={onChangeAuthCode} />
          </InputWrapper>
        )}
      </Card>
      <NextButton active={isActiveSend} onClick={onClickSend}>
        {isActiveSend ? `Send Code` : `Retry...${countDownText}`}
      </NextButton>
      <NextButton active={isActiveNext} onClick={onClickNext}>
        NEXT
      </NextButton>
    </Step>
  );
};

export default React.memo(Step2);
