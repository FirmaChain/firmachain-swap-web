import React from "react";

import { Modal } from "../../components/modal";

import { ModalContainer, ModalContent, NextButton, TitleTypo, SubTypo } from "./styles";

const ConfirmModal = ({ visible, onClose, confirmAction, amount }: any) => {
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
          <TitleTypo>Do you want to confirm the registration for the swap?</TitleTypo>
          <SubTypo>{amount} FCT</SubTypo>
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
