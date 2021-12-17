import React from "react";

import { Modal } from "../../components/modal";

import { ModalContainer, ModalContent, NextButton } from "./styles";

const ConfirmModal = ({ visible, onClose, confirmAction }: any) => {
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
        <ModalContent>
          <div
            style={{ textAlign: "center", color: "white", marginTop: "20px", marginBottom: "20px", fontSize: "16px" }}
          >
            Do you want to confirm the registration for the swap?
          </div>
          <NextButton
            active={true}
            onClick={() => {
              confirmAction();
            }}
            style={{ marginTop: "40px" }}
          >
            CONFIRM
          </NextButton>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default React.memo(ConfirmModal);
