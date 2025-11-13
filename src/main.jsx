import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
// import AuthProvider from './providers/AuthProvider'
import { router } from './routes/Routes'
import { Toaster } from 'react-hot-toast'
import { Bounce, ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(

  <>
    {/* <Toaster /> */}
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <RouterProvider router={router} />
  </>
)