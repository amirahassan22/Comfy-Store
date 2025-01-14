import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

export default function Error() {
  const error = useRouteError()
    
    if(error.status === 404){
      return (
        <main className='flex justify-center items-center h-lvh text-center'>
            <div>
                <h2 className='text-info text-9xl font-semibold'>404</h2>
                <p className='text-gray-800 font-bold text-5xl pt-3'>page not found</p>
                <p className='text-gray-700 text-lg pt-5'>Sorry, we couldn’t find the page you’re looking for.</p>
                <Link className='btn btn-primary mt-7 text-white hover:text-white' to='/'>GO BACK HOME</Link>
            </div>
        </main>
      )
    }
    return(
      <main className='flex justify-center items-center h-lvh text-center'>
        <h4 className=' text-3xl'>There was an error.....</h4>
      </main>
    )
  
}
