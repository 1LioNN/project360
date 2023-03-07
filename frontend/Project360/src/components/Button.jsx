import React from "react";

function Button(props) {
  return (
    <div>
      <button className={props.className + " border-indigo-500 rounded-xl border-solid border p-3 w-28"} onClick={props.onClick}>{props.text}</button>
    </div>
  );
}

export default Button;
