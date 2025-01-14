import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function SingleError() {
    const error = useRouteError()
    console.log(error.error.message);
    
  return (
    <div>something went wrong !!</div>
  )
}
