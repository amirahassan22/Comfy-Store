import React, { useState } from 'react'

export default function CheckboxInput({label,name,defaultValue,size}) {
 
  return (
    <div className="form-control">
  <label className="label cursor-pointer flex flex-col justify-center items-center">
    <span className="label-text mb-3">{label}</span>
    <input type="checkbox" defaultChecked={defaultValue} name={name} className={`checkbox ${size}`} />
  </label>
</div>
  )
}
