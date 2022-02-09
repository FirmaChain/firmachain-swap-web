import React, { useContext } from "react";
import { MainContext } from "../../pages/main";
import { STEP_STATUS } from "../../constants/main";
import { useSelector } from "react-redux";

import { Step, BigLabel, StatusLink, SubTypo, NotiCard, NotiTypo, NotiAddress } from "./styles";

const ResultOrder = () => {
  const { order } = useSelector((state: any) => state.user);
  const { setStep } = useContext(MainContext);

  const openScan = () => {
    window.open(`${process.env.REACT_APP_SCAN_URL}/tx/${order.txHash}`);
  };

  return (
    <>
      <Step>
        <BigLabel>Registration</BigLabel>
        <SubTypo>Your registration is complete.</SubTypo>
        <SubTypo>We will proceed after checking your swap request transaction.</SubTypo>
        <SubTypo>Confirming your token swap registration can take up to 10 minutes.</SubTypo>
        <SubTypo>The actual token swap process can take some time. (Max. 2 days)</SubTypo>
        <SubTypo style={{ marginTop: "15px" }}>Also, we will send token swap progress updates to your e-mail.</SubTypo>
        <NotiCard>
          <NotiTypo>Your transaction hash URL</NotiTypo>
          <NotiAddress onClick={openScan}>{order.txHash}</NotiAddress>
        </NotiCard>
      </Step>
      <StatusLink onClick={() => setStep(STEP_STATUS)}>SWAP STATUS</StatusLink>
    </>
  );
};

export default React.memo(ResultOrder);
