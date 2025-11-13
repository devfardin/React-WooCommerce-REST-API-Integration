import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { RxCross1 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router'
import NoCartItem from '../../pages/Checkout/NoCartItem'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
const CartModal = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cart, setCart] = useState([]);
    const navigate = useNavigate()

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart);
        toast.info('Item removed from your cart.')
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) return
        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
        toast.success('Cart updated successfully!')
    }

    const addProductsToCart = (product) => {
        setIsOpen(true)
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
    const close = () => {
        setIsOpen(false)
    }
    const subTotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
    const totalAmount = subTotal;
    return (
        <>
            <Button onClick={() => addProductsToCart(product)}
                className='bg-btndangerbg text-white px-2 py-1.5 hover:bg-btndangerhoverbg transition-colors duration-300 w-full block text-center text-lg font-medium'>
                Add to Cart
            </Button>


            <Dialog open={isOpen} as="div" className="relative z-30 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                    <div className="flex min-h-full items-center z-50 justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-4xl rounded-xl bg-white shadow-xl p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">

                            <DialogTitle as="h3" className="text-base/7 font-medium text-heading flex flex-row items-center justify-between border-b pb-2 mb-3 border-border">
                                <h2 className='text-xl text-headingcolor font-medium'>
                                    Cart Items
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                                    aria-label="Close menu"
                                >
                                    <RxCross1 className="text-2xl text-neutral-600" />
                                </button>
                            </DialogTitle>

                            {/* Desktop Table */}
                            {
                                cart.length === 0 ? <NoCartItem /> : <div>
                                    <div className="hidden lg:block overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="border-b-2 border-gray-200">
                                                    <th className="text-left py-4 px-2 font-medium text-base">Product</th>
                                                    <th className="text-left py-4 px-2 font-medium text-base">Price</th>
                                                    <th className="text-left py-4 px-2 font-medium text-base">Quantity</th>
                                                    <th className="text-left py-4 px-2 font-medium text-base">Total</th>
                                                    <th className="text-left py-4 px-2 font-medium text-base">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(item => {
                                                    const total = (parseFloat(item.price) * item.quantity).toFixed(2)
                                                    return (
                                                        <tr key={item.id} className="border-b border-gray-200">
                                                            <td className="py-4 px-2">
                                                                <div className="flex items-center gap-4">
                                                                    <img
                                                                        src={item?.images[0].src}
                                                                        alt={item.name}
                                                                        className="w-16 h-16 object-fill rounded-lg"
                                                                    />
                                                                    <h3 className="text-sm font-medium">{item.name}</h3>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-2 font-medium">${parseFloat(item.price).toFixed(2)}</td>
                                                            <td className="py-4 px-2">
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                        className="w-8 h-8 border border-gray-300 bg-gray-50 rounded hover:bg-gray-100"
                                                                    >-</button>
                                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                        className="w-8 h-8 border border-gray-300 bg-gray-50 rounded hover:bg-gray-100"
                                                                    >+</button>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-2 font-medium text-headingprimary">${total}</td>
                                                            <td className="py-4 px-2">
                                                                <button
                                                                    onClick={() => removeFromCart(item.id)}
                                                                    className="text-headingcolor hover:text-primary p-2"
                                                                >
                                                                    <FaRegTrashCan className='text-2xl' />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-4 bg-gray-50 rounded-lg p-5">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-medium">Sub-Total:</span>
                                            <span className="font-medium">${subTotal?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-medium">Delivery Charges:</span>
                                            <span className="font-medium"> শিপিং জোন নির্বাচন করা হয়নি। </span>
                                        </div>
                                        <div className="flex justify-between items-center text-lg font-bold border-t border-gray-300 pt-3">
                                            <span>Total Amount:</span>
                                            <span className="text-primary">${totalAmount?.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4">
                                        <Button
                                            className="bg-[#0dcaf0] text-headingcolor cursor-pointer px-2 py-2  transition-colors duration-300 w-full block text-center text-lg font-medium rounded"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            আরও কিছু অর্ডার করবো
                                        </Button>
                                        <Link to={`/checkout`} className='bg-buttonbg text-white px-2 py-2 hover:bg-buttonhoverbg transition-colors duration-300 w-full block text-center text-lg font-medium rounded'>Checkout</Link>
                                    </div>
                                </div>
                            }
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default CartModal
