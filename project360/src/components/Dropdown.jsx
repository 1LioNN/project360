import React from "react";
import { useState } from "react";
import ModelButton from "./ModelButton";

function Dropdown({ type, addModel }) {

    return (   
        <div>
            <ModelButton type="bed" addModel={addModel}/>
        </div>
    );
}
export default Dropdown;