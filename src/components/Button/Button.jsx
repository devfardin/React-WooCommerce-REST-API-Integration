/* eslint-disable react/prop-types */
import { ClipLoader } from "react-spinners";
const Button = ({ label, onClick, disabled, outline, small, icon: Icon, loading }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative flex justify-center items-center gap-2 
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          px-4
          w-full
          ${outline ? 'bg-white' : 'bg-primary'}
          ${outline ? 'border-black' : 'border-primary'}
          ${outline ? 'text-black' : 'text-white'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'py-1' : 'py-3'}
          ${small ? 'font-light' : 'font-semibold'}
          ${small ? 'border-[1px]' : 'border-2'}
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
              absolute
              left-4
              top-3
            '
        />
      )}
      {
        loading ? <ClipLoader color="white"  size={25}/> :   label 
      }
    </button>
  )
}

export default Button
