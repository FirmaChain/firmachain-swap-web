import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { MainContext } from "../../pages/main";
import { STEP_STATUS } from "../../constants/main";
import { useSelector } from "react-redux";

import { copyToClipboard } from "../../utils/common";
import styled from "styled-components";

import { Step, BigLabel, Label, InputWrapper, Card, InputTypo, CopyIcon, StatusLink } from "./styles";

const NotiCard = styled.div`
  width: calc(100% - 40px);
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  border: 1px solid #47ec9f;
  border-radius: 4px;
`;

const NotiTypo = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  color: #47ec9f;
`;

const NotiAddress = styled.div`
  font-size: 18px;
  text-decoration: underline;
  color: white;
`;

const ResultOrder = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { order } = useSelector((state: any) => state.user);
  const { setStep } = useContext(MainContext);

  const copy = () => {
    copyToClipboard(process.env.REACT_APP_FIRMA_ETH_ADDRESS ? process.env.REACT_APP_FIRMA_ETH_ADDRESS : "");

    enqueueSnackbar("Copied", {
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  return (
    <>
      <Step>
        <BigLabel>Registration</BigLabel>

        <NotiCard>
          <NotiTypo>Please send FCT to this address</NotiTypo>
          <a
            href={`https://ropsten.etherscan.io/address/${process.env.REACT_APP_FIRMA_ETH_ADDRESS}#tokentxns`}
            target="_blank"
            rel="noreferrer"
          >
            <NotiAddress>{process.env.REACT_APP_FIRMA_ETH_ADDRESS}</NotiAddress>
          </a>
          <CopyIcon onClick={copy} viewBox="0 0 24 24" width="18px" height="18px" style={{ marginTop: "10px" }}>
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"></path>
          </CopyIcon>
        </NotiCard>
        <Card>
          <InputWrapper>
            <Label>From (ETH)</Label>
            <InputTypo>{order.ethAddress}</InputTypo>
          </InputWrapper>
          <InputWrapper>
            <Label>To (FirmaChain)</Label>
            <InputTypo>{order.firmaAddress}</InputTypo>
          </InputWrapper>
          <InputWrapper>
            <Label>Amount</Label>
            <InputTypo>{`${order.amount} FCT`}</InputTypo>
          </InputWrapper>
          <InputWrapper>
            <Label>Email</Label>
            <InputTypo>{order.emailAddress}</InputTypo>
          </InputWrapper>

          <InputWrapper>
            <Label>Order Id</Label>
            <InputTypo>{order.orderId}</InputTypo>
          </InputWrapper>
        </Card>
      </Step>
      <StatusLink onClick={() => setStep(STEP_STATUS)}>SWAP STATUS</StatusLink>
    </>
  );
};

export default React.memo(ResultOrder);
