"use client";
import { useState } from "react";
import Image from "next/image";
import ShowIcon from "@/assets/icons/show-icon.svg";
import HiddenIcon from "@/assets/icons/hidden-icon.svg";
import ErrorInfoIcon from "@/assets/icons/error-info-icon.svg";
import { LabelContainer, InputContainer, InputComponent, IconWrapper, ErrorMessageContainer } from "./Input.styled";

interface InputProps {
  type: "with-icon" | "no-icon" | "password" | "number";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  labelText?: string;
  value?: string;
  icon?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function Input({ type, onChange, placeHolder, labelText = "", value, icon = "", className, error = false, errorMessage }: InputProps) {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e: any) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const SelectedInputType = () => {
    switch (type) {
      case "number":
        return (
          <LabelContainer className={className}>
            {labelText === "" ? "" : <span className="label-input">{labelText}</span>}
            <InputContainer $isError={error} $isFocus={focus}>
              <InputComponent type="number" value={value} onFocus={handleFocus} onChange={onChange} onBlur={handleBlur} placeholder={placeHolder} />
            </InputContainer>

            {error ? (
              <ErrorMessageContainer>
                <Image src={ErrorInfoIcon} alt="" /> <span>{errorMessage}</span>
              </ErrorMessageContainer>
            ) : (
              ""
            )}
          </LabelContainer>
        );
      case "password":
        return (
          <LabelContainer className={className}>
            {labelText === "" ? "" : <span className="label-input">{labelText}</span>}
            <InputContainer $isError={error} $isFocus={focus}>
              <InputComponent type={showPassword ? "text" : "password"} value={value} onFocus={handleFocus} onChange={onChange} onBlur={handleBlur} placeholder={placeHolder} />

              <IconWrapper onClick={toggleShowPassword}>{showPassword ? <Image src={ShowIcon} alt="" /> : <Image src={HiddenIcon} alt="" />}</IconWrapper>
            </InputContainer>

            {error ? (
              <ErrorMessageContainer>
                <Image src={ErrorInfoIcon} alt="" /> <span>{errorMessage}</span>
              </ErrorMessageContainer>
            ) : (
              ""
            )}
          </LabelContainer>
        );

      default:
        return (
          <LabelContainer className={className}>
            {labelText === "" ? "" : <span className="label-input">{labelText}</span>}
            <InputContainer $isError={error} $isFocus={focus}>
              {type === "no-icon" ? "" : <Image src={icon} alt="" className="icon" />}

              <InputComponent value={value} onFocus={handleFocus} onChange={onChange} onBlur={handleBlur} placeholder={placeHolder} />
            </InputContainer>

            {error ? (
              <ErrorMessageContainer>
                <Image src={ErrorInfoIcon} alt="" /> <span>{errorMessage}</span>
              </ErrorMessageContainer>
            ) : (
              ""
            )}
          </LabelContainer>
        );
    }
  };

  return <>{SelectedInputType()}</>;
}
