import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import CloseIcon from '../../assets/modal/close';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 32px;
  border-radius: 30px;
  z-index: 101;
  @media (width <= 768px) {

  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background: none;
  svg {
    width: 20px;
    height: 20px;
  }
  /* svg path {
    width: 40px;
    height: 40px;
  } */
  &:hover{
    svg path {
      fill: #e00000ca;
    }
  }
`;

const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <ModalOverlay open={open} onClick={onClose}>
      <ModalContainer>
        <CloseButton onClick={onClose}><CloseIcon /></CloseButton>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
