import { Link, useLocation } from 'react-router-dom'
import Container from '../Container'
import { FaPhone } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import MobileMenu from './MobileMenu';
import { LiaShoppingBagSolid } from "react-icons/lia";

const menuItems = [
  { label: 'Home', link: '/' },
  { label: 'Shop', link: '/shop' },
  { label: 'Check Out', link: '/checkout' },
];

const Navbar = ({siteData}) => {
  const location = useLocation();

  console.log(siteData);
  

  return (
    <div className='w-full bg-white shadow-sm sticky top-0 z-20'>
      {/* Main Header */}
      <div className='py-4'>
        <Container>
          <div className='grid md:grid-cols-3 grid-cols-2 items-center gap-4'>

            {/* Left - Logo (with mobile menu on tablet) */}
            <div className='flex items-center gap-3 col-span-1'>
              <div className='lg:hidden'>
                <MobileMenu siteData={siteData} />
              </div>
              <Link to='/'>
                <img src={siteData.site_logo} className='w-24 lg:w-32'
                  alt={siteData.site_title} />
              </Link>
            </div>

            {/* Center - Search Bar */}
            <div className='relative hidden sm:block'>
              <input
                placeholder='Search products...'
                className="w-full h-12 pl-4 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className='absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-primary transition-colors'>
                <IoSearchSharp className="text-xl" />
              </button>
            </div>

            {/* Right - Contact & Cart */}
            <div className='flex items-center justify-end gap-3 col-span-1'>
              <div className='hidden md:flex items-center gap-3'>
                <div className='bg-primary p-2.5 rounded'>
                  <FaPhone className='text-xl text-white' />
                </div>
                <a href="tel:+8801730638964" className='flex flex-col text-sm hover:text-primary transition-colors'>
                  <span className='text-gray-600'>অর্ডার করতে কল করুন</span>
                  <span className='font-bold text-primary'>01730638964</span>
                </a>
              </div>

              <Link to='/checkout' className='relative bg-primary p-2.5 rounded hover:bg-primary/90 transition-colors'>
                <LiaShoppingBagSolid className='text-xl text-white' />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Menu - Desktop Only */}
      <div className='hidden lg:block bg-menubg border-t border-gray-200'>
        <Container>
          <nav className='flex items-center justify-center py-3'>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`px-6 py-1 text-lg font-medium hover:text-menuhover ${location.pathname === item.link ? 'text-menucolor' : 'text-white'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
export { menuItems }