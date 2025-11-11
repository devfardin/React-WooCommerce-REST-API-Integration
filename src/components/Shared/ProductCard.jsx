import { useState } from 'react';
import { Link } from 'react-router'
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const [cart, setCart] = useState([]);
     const location = useLocation();

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
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Successfully Product add to cart",
                showConfirmButton: false,
                timer: 2000
            });
             window.location.href = '/checkout';
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
        <div className='relative group border border-border rounded-xl shadow bg-white'>
            {/* Product Image */}
            <div className='overflow-hidden rounded-t-xl'>
                <img
                    src={product?.images[0].src}
                    alt={product.name}
                    className='w-full h-64 object-fill transition-transform duration-300 group-hover:scale-110'
                />
            </div>

            {/* Product Details wrapper */}
            <div>

                <div className='p-2 flex flex-col gap-1'>
                    <h3 className='font-medium text-lg line-clamp-2 truncate'>{product.name}</h3>


                </div>
                <div className='mt-3 flex flex-col'>
                    <Link to={`details/${product.id}`} className='bg-btndangerbg text-white px-2 py-1.5 hover:bg-btndangerhoverbg transition-colors duration-300 w-full block text-center text-lg font-medium'>Add to Cart</Link>

                    <button onClick={() => addProductsToCart(product)}
                        // to={`details/${product.id}`}
                        className='bg-primary text-white px-2 py-1.5 hover:bg-btndangerhoverbg transition-colors duration-300 w-full block text-center text-lg font-medium rounded-b-xl'>Add to Cart</button>
                </div>
            </div>

        </div>
    )
}

export default ProductCard
