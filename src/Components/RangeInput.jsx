import React, { useState } from 'react'
import { formatPrice } from '../utils';

export default function RangeInput({label,name,size,price}) {
    const steps = 1000;
    const maxPrice = 100000;
    const [selectedPrice,setSelectedPrice] = useState(price || maxPrice)
  return (
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">{label}</span>
    <span className="label-text-alt">{formatPrice(selectedPrice)}</span>
  </div> 
  <input type="range" min={0} max={maxPrice} step={steps} name={name} defaultValue={selectedPrice}  onChange={(e)=> setSelectedPrice((e.target.value)) } className={`range range-primary ${size}`} />
  <div className="label font-bold">
    <span className="label-text-alt">0</span>
    <span className="label-text-alt">Max: {formatPrice(maxPrice)}</span>
  </div>
</label>
  )
}
