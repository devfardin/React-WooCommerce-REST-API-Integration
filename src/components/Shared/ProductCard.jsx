import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import CartModal from '../Modal/CartModal';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();


    const addProductsToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        const productExists = cart.find((item) => item.id === product.id);
        if (productExists) {
            productExists.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart([...cart]);
        if (cart.length > 0) {
            toast.success('Successfully Product add to cart')
            navigate('/checkout');
        } else {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Product not added to cart",
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
    return (
        <div className='relative group border border-border rounded-xl shadow bg-white overflow-hidden'>
            {/* Product Image */}
            <Link to={`/details/${product?.id}`} className='overflow-hidden block'>
                <img
                    src={product?.images[0]?.src}
                    alt={product?.name}
                    className='w-full lg:h-64 md:h-60 h-52 object-fill rounded-t-xl transition-transform duration-300 group-hover:scale-110 hover:rounded-t-xl overflow-hidden'
                />
            </Link>

            {/* Product Details wrapper */}
            <div>

                <div className='p-2 flex flex-col gap-1'>
                    <Link to={`details/${product?.id}`} className='overflow-hidden block'>
                        <h3 className='font-medium text-lg line-clamp-2 truncate hover:text-primary transition-colors duration-100' title={product?.name}>{product?.name}</h3>
                    </Link>
                    <div className='flex gap-3'>
                        {
                            product?.regular_price ?
                                <h2 className='text-lg text-gray-600 line-through'>৳ {product?.regular_price}</h2> : ""
                        }
                        <h2>
                            <span className='text-lg font-semibold text-primary'>৳ {product?.price}</span>
                        </h2>
                    </div>


                </div>
                <div className='mt-3 flex flex-col'>

                    {/* Cart Modal  */}
                    <CartModal product={product} />

                    <button onClick={() => addProductsToCart(product)}
                        className='bg-primary text-white px-2 py-1.5 cursor-pointer transition-colors duration-300 w-full block text-center text-lg font-medium rounded-b-xl'>অর্ডার করুন</button>
                </div>
            </div>

        </div>
    )
}

export default ProductCard
