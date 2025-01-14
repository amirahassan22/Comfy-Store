import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem';

export default function CartList() {
    const {cartItems} = useSelector(state=> state.cart);
  return (
    <div>
        {cartItems.length > 0 ? cartItems.map(item=> <CartItem key={item.cartId} productData={item}/>): <h2>your cart is empty :)</h2>}
    </div>
  )
}
