import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import Single from '../pages/single/single'
import ErrorPage from '../pages/ErrorPage'
import CheckOut from '../pages/Checkout/CheckOut'
import CategoryProducts from '../pages/Categories/CategoryProducts'
import Products from '../pages/Products/Products'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path:'details/:id',
        element: <Single/>
      },
      {
        path:'checkout',
        element: <CheckOut/>
      },
      {
        path:'category/:slug',
        element: <CategoryProducts/>
      },
      {
        path:'shop',
        element: <Products/>
      }
    ],
  },
  // { path: '/login', element: <Login /> },
  // { path: '/signup', element: <SignUp /> },
])
