'use client';
import styled from 'styled-components';

const handleError = (isFocus: boolean, isError: boolean) => {
  if (isFocus && !isError) {
    return '1.5px solid var(--primary)';
  } else if (isFocus && isError) {
    return '1.5px solid #E00000';
  } else if (!isFocus && isError) {
    return '1.5px solid #E00000';
  } else {
    return '';
  }
};

export const LabelContainer = styled.label`
  .label-input {
    display: block;
    margin: 0 0 8px 0;
  }
`;

export const InputContainer = styled.div<{
  $isFocus: boolean;
  $isError: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f7f7f8;
  height: 48px;
  gap: 8px;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  outline: ${(props) => handleError(props.$isFocus, props.$isError)};

  &:focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(135, 136, 138, 0.25), 0px 0px 0px 3.5px rgba(206, 210, 216, 0.5);

  }

  &:active {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(135, 136, 138, 0.25), 0px 0px 0px 3.5px rgba(206, 210, 216, 0.5);
    opacity: 0.8;
  }

  &:hover {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(135, 136, 138, 0.25), 0px 0px 0px 3.5px rgba(206, 210, 216, 0.5);
    outline: 0;
  }
`;

export const InputComponent = styled.input`
  border: none;
  background-color: inherit;
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  font-size: 16px;

  &::placeholder {
    color: #9d9d9d;
    font-weight: 500;
    line-height: 14px;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
  }
`;

export const IconWrapper = styled.button`
  height: 100%;
  padding: 0 0 0 10px;
  position: absolute;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ErrorMessageContainer = styled.div`
  margin: 8px 0 0 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;
