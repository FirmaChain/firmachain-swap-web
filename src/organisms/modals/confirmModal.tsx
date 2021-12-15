import React from "react";
import { useSnackbar } from "notistack";

import { copyToClipboard } from "../../utils/common";
import { Modal } from "../../components/modal";

import {
  ModalContainer,
  ModalTitle,
  ModalContent,
  CopyIcon,
  OrderWrapper,
  InputWrapper,
  Label,
  InputTypo,
  NextButton,
} from "./styles";

const ConfirmModal = ({ visible, onClose, orderId, confirmAction }: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const copy = () => {
    copyToClipboard(orderId);

    enqueueSnackbar("Copied", {
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  return (
    <Modal
      visible={visible}
      closable={true}
      onClose={() => {
        onClose();
      }}
      width={"490px"}
    >
      <ModalContainer>
        <ModalTitle>CONFIRM</ModalTitle>
        <ModalContent>
          <InputWrapper
            style={{
              width: "calc(100% - 40px)",
              marginTop: "20px",
              marginBottom: "12px",
              backgroundColor: "#292931",
              borderRadius: "8px",
              padding: "15px 20px",
            }}
          >
            <Label>Order Id</Label>
            <OrderWrapper>
              <InputTypo>{orderId}</InputTypo>
              <CopyIcon onClick={copy} viewBox="0 0 24 24" width="18px" height="18px">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"></path>
              </CopyIcon>
            </OrderWrapper>
          </InputWrapper>
          <div style={{ color: "#ffc543", fontSize: "12px", marginLeft: "3px" }}>Please copy this order ID.</div>
          {/* <NotiCard></NotiCard> */}

          <NextButton active={true} onClick={confirmAction} style={{ marginTop: "40px" }}>
            CONFIRM
          </NextButton>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default React.memo(ConfirmModal);
