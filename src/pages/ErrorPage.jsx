import Button from '../components/Button/Button'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center px-4'>
      <div className='max-w-lg w-full text-center'>
        {/* Animated Error Icon */}
        <div className='relative mb-8'>
          <div className='w-24 h-24 mx-auto bg-gradient-to-r from-rose-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse'>
            <svg
              className='w-12 h-12 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <div className='absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce'></div>
        </div>

        {/* Error Message */}
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          Oops!
        </h1>
        <h2 className='text-xl font-semibold text-gray-600 mb-2'>
          Something went wrong
        </h2>
        <p className='text-gray-500 mb-8 leading-relaxed'>
          We encountered an unexpected error. Don't worry, it's not your fault!
        </p>
        {/* Action Buttons */}
        
          <Button 
            label='Take Me Home' 
            onClick={() => navigate('/')} 
          />

        {/* Decorative Elements */}
        <div className='mt-12 flex justify-center space-x-2'>
          <div className='w-2 h-2 bg-rose-300 rounded-full animate-bounce'></div>
          <div className='w-2 h-2 bg-orange-300 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
          <div className='w-2 h-2 bg-yellow-300 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
