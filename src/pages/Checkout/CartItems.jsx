import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from 'react-icons/fa6'

const CartItems = ({ shippingZoon }) => {

    console.log(shippingZoon[0]?.settings?.cost?.value);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')) || [])
    }, [])

    const deliveryCharges = Number(shippingZoon?.settings?.cost?.value || shippingZoon?.[0]?.settings?.cost?.value || 120);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart);
        toast.success('Item removed from your cart.')
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

    const subTotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
    const totalAmount = subTotal + deliveryCharges

    return (
        <div>

            {/* Desktop Table */}
            <div className="hidden xl:block overflow-x-auto">
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
                            const total = (parseFloat(item.price) * item.quantity)
                            return (
                                <tr key={item.id} className="border-b border-gray-200">
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item?.images[0].src}
                                                alt={item.name}
                                                className="w-16 h-16 object-fill rounded-lg"
                                            />
                                            <h3 className="text-base font-medium">{item.name}</h3>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 font-medium">{parseFloat(item.price).toFixed(0)}  ৳</td>
                                    <td className="py-4 px-2">
                                        <div>
                                            <div className="flex border border-border rounded items-center justify-between gap-1">
                                                <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 border border-border bg-gray-50 hover:bg-gray-100"
                                            >-</button>
                                            <span className="w-5 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 border border-border bg-gray-50 hover:bg-gray-100"
                                            >+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 font-medium text-headingprimary">{total} ৳</td>
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

            {/* Mobile Cards */}
            <div className="xl:hidden space-y-4">
                {cart.map(item => {
                    const total = (parseFloat(item.price) * item.quantity).toFixed(2)
                    return (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex gap-4 mb-3">
                                <img
                                    src={item?.images[0].src}
                                    alt={item.name}
                                    className="w-20 h-20 object-fill rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-lg leading-5 mb-1">{item.name}</h3>
                                    <p className="text-gray-600 text-lg">{parseFloat(item.price).toFixed(2)} ৳</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-headingcolor hover:text-primary p-2"
                                >
                                    <FaRegTrashCan className='text-2xl' />
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 border border-border">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 border border-border bg-gray-50 "
                                    >-</button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 border border-border bg-gray-50"
                                    >+</button>
                                </div>
                                <div className="font-semibold text-headingcolor">{total} ৳</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Footer */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Sub-Total:</span>
                    <span className="font-medium">{subTotal.toFixed(2)} ৳</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Delivery Charges:</span>
                    <span className="font-medium flex gap-2 sm:text-base text-sm">
                        {shippingZoon.id ? shippingZoon.title : shippingZoon[0].title}
                        <span className='text-primary font-semibold'>{shippingZoon.id ? shippingZoon?.settings?.cost?.value : shippingZoon[0].settings?.cost?.value} ৳ </span>
                    </span>

                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t border-gray-300 pt-3">
                    <span>Total Amount:</span>
                    <span className="text-primary">{totalAmount.toFixed(2)} ৳</span>
                </div>
            </div>
        </div>
    )
}

export default CartItems