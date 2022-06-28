import { useState } from "react";

const InputHook = (type) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [nameClassName, setNameClassName] = useState("form-control");
  let isValid = false;
  let inputIsvalid = isValid && isTouched;
  const changeHandler = (event) => {
    setIsTouched(true);
    setInputValue(event.target.value);

    if (type === "name")
      isValid = inputValue.trim() !== "" && inputValue.length > 2;
    if (type === "lastname")
      isValid = inputValue.trim() !== "" && inputValue.length > 5;

    if (type === "email") {
      isValid =
        inputValue.trim() !== "" &&
        inputValue.includes("@") &&
        inputValue.includes(".") &&
        inputValue.length > 6;
    }

    if (type === "nickname")
      isValid = inputValue.trim() !== "" && inputValue.length > 5;

    if (type === "password") {
      isValid = inputValue.trim() !== "" && inputValue.length > 7;
    }

    inputIsvalid = isValid && isTouched;
    setNameClassName(inputIsvalid ? "" : "invalid");
  };

  const lostFocus = () => {
    setIsTouched(true);
    if (type === "name")
      isValid = inputValue.trim() !== "" && inputValue.length > 2;
    if (type === "lastname")
      isValid = inputValue.trim() !== "" && inputValue.length > 5;

    if (type === "email") {
      isValid =
        inputValue.trim() !== "" &&
        inputValue.includes("@") &&
        inputValue.includes(".") &&
        inputValue.length > 6;
    }

    if (type === "nickname")
      isValid = inputValue.trim() !== "" && inputValue.length > 5;

    if (type === "password") {
      isValid = inputValue.trim() !== "" && inputValue.length > 7;
    }
    inputIsvalid = isValid && isTouched;
    setNameClassName(inputIsvalid ? "" : "invalid");
  };

  return {
    inputValue: inputValue,
    changeHandlerFun: changeHandler,
    nameClassName: nameClassName,
    focusHandler: lostFocus,
  };
};

export default InputHook;
