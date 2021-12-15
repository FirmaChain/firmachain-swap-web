import React from "react";

import { Modal } from "../../components/modal";

import { ModalContainer, ModalTitle, ModalContent, NextButton } from "./styles";

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
        <ModalTitle>CONFIRM</ModalTitle>
        <ModalContent>
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
