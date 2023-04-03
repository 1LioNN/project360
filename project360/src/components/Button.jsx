import React from "react";

function Button(props) {
  return (
    <button
      className={
        props.className +
        " border-indigo-500 rounded-xl border-solid border p-3"
      }
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
