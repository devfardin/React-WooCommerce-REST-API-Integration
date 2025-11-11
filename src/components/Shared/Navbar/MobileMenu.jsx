import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import logo from '../../../assets/images/logo.png';
import { GoArrowUpRight } from "react-icons/go";
import { TbMenu2 } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import { FaPhone } from "react-icons/fa6";
import { LiaShoppingBagSolid } from "react-icons/lia";

// Menu items for mobile
const mobileMenuItems = [
  { label: 'Home', link: '/' },
  { label: 'Categories', link: '/categories' },
  { label: 'Products', link: '/products' },
  { label: 'About', link: '/about' },
  { label: 'Contact', link: '/contact' },
  { label: 'Login', link: '/login' },
  { label: 'Sign Up', link: '/signup' }
];

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    const toggleMenu = () => setIsOpen(!isOpen);
    
    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);
    
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };
        
        const handleClickOutside = (event) => {
            const menu = document.getElementById("mobile-menu");
            const trigger = document.getElementById("menu-trigger");
            const closeBtn = document.getElementById("menu-close");
            const target = event.target;
            
            if (
                menu &&
                target instanceof Node &&
                !menu.contains(target) &&
                !(
                    (trigger && trigger.contains(target)) ||
                    (closeBtn && closeBtn.contains(target))
                ) &&
                isOpen
            ) {
                closeMenu();
            }
        };
        
        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, closeMenu]);


    return (
        <div className="lg:hidden relative">
            {/* Menu Toggle Button */}
            <button
                id="menu-trigger"
                onClick={toggleMenu}
                className="p-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                <TbMenu2 className="text-2xl" />
            </button>

            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <div
                id="mobile-menu"
                role="navigation"
                aria-label="Mobile navigation menu"
                className={`fixed top-0 left-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-full overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <img alt="Logo" src={logo} className="h-auto w-32" />
                        <button
                            id="menu-close"
                            onClick={closeMenu}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                            aria-label="Close menu"
                        >
                            <RxCross1 className="text-2xl text-neutral-600"/>
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-6">
                        <ul className="space-y-2">
                            {mobileMenuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.link}
                                        onClick={closeMenu}
                                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                                            location.pathname === item.link
                                                ? "bg-primary text-white"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                                        }`}
                                    >
                                        <span className="font-medium">{item.label}</span>
                                        <GoArrowUpRight className="text-lg" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact Section */}
                    <div className="p-6 border-t border-gray-200 mt-auto">
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-primary p-2 rounded-full">
                                    <FaPhone className="text-white text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">অর্ডার করতে কল করুন</p>
                                    <a href="tel:+8801730638964" className="font-bold text-primary">
                                        01730638964
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <Link
                            to="/cart"
                            onClick={closeMenu}
                            className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <LiaShoppingBagSolid className="text-xl" />
                            <span className="font-medium">View Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
export { mobileMenuItems };