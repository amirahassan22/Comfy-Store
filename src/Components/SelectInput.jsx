import React from "react";
import { selectOptions } from "../utils";
// import { useLoaderData } from "react-router-dom";

export default function SelectInput({ optionsArr,defaultValue,name,label,size }) {
  const options = selectOptions(optionsArr);
  
  
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select className={`select select-bordered ${size}`} name={name} defaultValue={defaultValue}>
        {options}
      </select>
    </label>
  );
}
