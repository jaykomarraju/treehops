import React from "react";
import styled from "styled-components";
import Button from "./Button";

const ModalContainer = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const SuccessModal = ({ show, onClose, message }) => {
  return (
    <ModalContainer show={show}>
      <ModalContent>
        <h2>Success</h2>
        <p>{message}</p>
        <Button text="Close" onClick={onClose} />
      </ModalContent>
    </ModalContainer>
  );
};

export default SuccessModal;
