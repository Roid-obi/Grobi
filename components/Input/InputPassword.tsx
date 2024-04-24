import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import ShowPasswordIcon from "@/assets/input/show-password.svg";
import HidePasswordIcon from "@/assets/input/hide-password.svg";
import ErrorIcon from "@/assets/input/Info.svg";

interface InputProps {
  type?: string;
  placeholder?: string;
  inputValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const ErrorContainer = styled.div<{ isError: boolean }>`
  display: ${(props) => (props.isError ? "flex" : "none")};
  margin-top: 8px;
  align-items: center;
`;

const ErrorText = styled.span`
  color: #ff0000;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-bottom: 10px; */
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
  margin-top: 10px;
`;

const InputField = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 10px 20px;
  border-radius: 30px;
  border: 1.5px solid ${(props) => (props.hasError ? "#FF0000" : "#E0E0E0")};
  outline: none;
  transition: border-color 0.3s ease;
  font-size: 16px;
  color: #000;
  &::placeholder {
    color: #9e9e9e;
  }
  &:focus,
  &:active {
    border-color: #0e0f0e;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default function Input({ type = "password", placeholder, inputValue, onChange, label, error, errorMessage }: InputProps) {
  const [value, setValue] = useState<string>(inputValue || "");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputContainer>
      {label ? <InputLabel htmlFor={label}>{label}</InputLabel> : ""}
      <div style={{ position: "relative" }}>
        <InputField type={showPassword ? "text" : type} placeholder={placeholder} value={value} onChange={handleChange} hasError={!!error} />
        <IconContainer onClick={handleTogglePassword}>
          <img src={showPassword ? HidePasswordIcon.src : ShowPasswordIcon.src} alt="" />
        </IconContainer>
      </div>
      <ErrorContainer isError={!!error}>
        <img src={ErrorIcon} alt="" style={{ height: "16px", width: "auto" }} />
        <ErrorText>{errorMessage}</ErrorText>
      </ErrorContainer>
    </InputContainer>
  );
}
