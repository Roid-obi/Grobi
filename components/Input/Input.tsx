import React, { useState, ChangeEvent } from "react";
import ShowPassword from "@/assets/input/show-password.svg";
import HidePassword from "@/assets/input/hide-password.svg";
import ErrorIcon from "@/assets/input/Info.svg";

interface InputProps {
  type?: string;
  placeholder?: string;
  inputValue?: string;
  onChange?: (value: string) => void;
  label: string;
  error?: boolean;
  errorMessage?: string;
}

const ErrorInfo: React.FC<{ isError: boolean; message: string }> = ({
  isError,
  message,
}) => {
  return (
    <>
      {isError ? (
        <div className="mt-[8px] flex items-center gap-[6px]">
          <img className="h-[16px] w-auto" src={ErrorIcon} alt="" />
          <span className="text-[#FF0000]">{message}</span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  inputValue,
  onChange,
  label,
  error,
  errorMessage,
}) => {
  const [value, setInputValue] = useState<string>(inputValue || "");
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleIcon = () => {
    setShow(!show);
  };

  return (
    <>
      {type === "password" ? (
        <div className="flex flex-col">
          <label className="mb-[5px] mt-[10px]" htmlFor={label}>
            {label}
          </label>
          <div className="w-full relative">
            <input
              type={show ? "text" : type}
              className={`shadow py-[10px] px-[20px] w-full rounded-[30px] border-[1.5px] border-solid active:border-[#0e0f0e] focus:border-[#0e0f0e] focus:outline-none placeholder:text-[#9E9E9E] ${
                error ? "border-[#FF0000]" : "border-[#E0E0E0]"
              }`}
              placeholder={placeholder}
              value={value}
              autoFocus
              onChange={handleChange}
              id={label}
            />
            <div className="absolute top-[14px] right-3" onClick={handleIcon}>
              {show ? (
                <img src={HidePassword} alt="" />
              ) : (
                <img src={ShowPassword} alt="" />
              )}
            </div>
          </div>

          <ErrorInfo isError={error || false} message={errorMessage || ""} />
        </div>
      ) : (
        <div className="flex flex-col">
          <label className="mb-[5px] mt-[10px]" htmlFor={label}>
            {label}
          </label>
          <input
            className={`shadow placeholder:text-[#9E9E9E] w-full py-[10px] px-[20px] rounded-[30px] border-[1.5px] border-solid active:border-[#0e0f0e] focus:border-[#0e0f0e] focus:outline-none ${
              error ? "border-[#FF0000]" : "border-[#E0E0E0]"
            }`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            id={label}
          />

          <ErrorInfo isError={error || false} message={errorMessage || ""} />
        </div>
      )}
    </>
  );
};

export default Input;
