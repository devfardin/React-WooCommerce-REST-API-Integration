import { Link } from "react-router-dom";
const ReactLink = ({ label, to, outline, small }) => {
  return (
    <Link
      to={to}
      className={` flex w-full rounded-lg px-4 transition hover:opacity-80 text-center justify-center
    ${outline ? 'bg-white border border-black text-black' : 'bg-rose-500 border-2 border-rose-500 text-white'}
    ${small ? 'py-1 text-sm font-light border' : 'py-3 text-md font-semibold border-2'}
  `}
    >
      {label}
    </Link>

  )
}

export default ReactLink
