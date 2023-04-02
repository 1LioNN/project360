import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Error({ errorCode, errorMessage, errorDescription, redirect }) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(redirect);
  };

  return (
    <div className="flex flex-col flex-grow gap-5 items-center justify-center text-neutral-700 font-bold text-2xl text-center mb-16">
      <span className="text-9xl text-neutral-700"> {errorCode} </span>
      <span className="text-3xl">{errorMessage}</span>
      <span>{errorDescription}</span>
      <Button
        className="bg-indigo-900 hover:bg-gradient-to-br from-blue-300 via-indigo-400 to-indigo-800 p-4 w-40 text-white"
        text={"Home"}
        onClick={() => clickHandler()}
      />
    </div>
  );
}

export default Error;
