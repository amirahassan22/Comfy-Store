import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {About, Cart, Home, Landing, Login, Orders, Products, Register, SingleProduct,Error, Checkout, SingleError} from './Pages/index.js'
import { loader as productsLoader } from './Pages/Products.jsx'
import { loader as landingLoader } from './Pages/Landing.jsx'
import { loader as singleProductLoader } from './Pages/SingleProduct.jsx'
import { loader as ordersLoading } from './Pages/Orders.jsx'
import { loader as checkoutLoader } from './Pages/Checkout.jsx'
import { action as registerAction } from './Pages/Register.jsx'
import { action as loginAction } from './Pages/Login.jsx'
import { action as checkoutAction } from './Components/CheckoutForm.jsx'
import {store} from './store.js'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 1000* 60* 5 , // will keep the request cached for 5 mins
    }
  }
})

const routes = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<Error/>,
    children:[
      
      {
        index:true,
        element:<Landing/>,
        errorElement:<SingleError/>,
        loader:landingLoader(queryClient)
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"products",
        element:<Products/>,
        loader:productsLoader(queryClient),
       
      },
      {
        path:"products/:id",
        element:<SingleProduct/>,
        loader:singleProductLoader(queryClient)
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {path:"checkout",
      element:<Checkout/>,
      loader: checkoutLoader(store),
      action: checkoutAction(store,queryClient)
    },
      {
        path:"orders",
        element:<Orders/>,
        loader:ordersLoading(store,queryClient)
      },
      
    ]
  },
  {
    path:"/login",
    element:<Login/>,
    errorElement:<Error/>,
    action: loginAction(store)
  },
  {
    path:"/register",
    element:<Register/>,
    errorElement:<Error/>,
    action: registerAction
  },
])
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App
