import styled from "styled-components";

export const RegisterStyled = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardRegister = styled.div`
    border: 1px solid var(--border);
    padding: 30px;
    width: 100%;
    max-width: 500px;
    border-radius: 24px;
`;

export const FormRegister = styled.form`
    width: 100%;
`;

export const TitleCard = styled.p`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    font-size: 25px;
    font-weight: 600;
`;

export const InputItem = styled.div`
    margin-top: 20px;
`;

export const ButtonRegister = styled.button`
    margin-top: 20px;
    width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
  height: 48px;
  border-radius: 24px;
  border: none;
  font-weight: 400;
font-size: 20px;
  color: var(--white);
  background: var(--primary);
  cursor: pointer;

  &.active {
    color: var(--white);
    background: var(--black);
  }

  &:active {
    opacity: 0.8;
  }

  &:hover {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(135, 136, 138, 0.25), 0px 0px 0px 3.5px rgba(206, 210, 216, 0.5);
    outline: 0;
  }
`;


export const CloseButton = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  background: none;
  svg {
    width: 15px;
    height: 15px;
  }
  /* &:hover{
    svg path {
      fill: #e00000ca;
    }
  } */
`;