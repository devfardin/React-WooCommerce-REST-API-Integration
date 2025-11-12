import React from 'react'
import { FaTrash } from 'react-icons/fa'

const CartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const deliveryCharges = 50
    
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        window.location.reload()
    }
    
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) return
        const updatedCart = cart.map(item => 
            item.id === productId ? {...item, quantity: newQuantity} : item
        )
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        window.location.reload()
    }
    
    const subTotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
    const totalAmount = subTotal + deliveryCharges
    
    return (
        <div className="p-4">
            <h2 className="mb-6 text-2xl font-bold">Shopping Cart</h2>
            
            {cart.length === 0 ? (
                <div className="text-center py-10 text-gray-600">
                    Your cart is empty
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
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
                                                        className="w-16 h-16 object-cover rounded-lg"
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
                                            <td className="py-4 px-2 font-semibold text-primary">${total}</td>
                                            <td className="py-4 px-2">
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-600 hover:text-red-800 p-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                        {cart.map(item => {
                            const total = (parseFloat(item.price) * item.quantity).toFixed(2)
                            return (
                                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex gap-4 mb-3">
                                        <img 
                                            src={item?.images[0].src} 
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                                            <p className="text-gray-600">${parseFloat(item.price).toFixed(2)}</p>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 border border-gray-300 bg-gray-50 rounded"
                                            >-</button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 border border-gray-300 bg-gray-50 rounded"
                                            >+</button>
                                        </div>
                                        <div className="font-semibold text-primary">${total}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-medium">Sub-Total:</span>
                            <span className="font-medium">${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-medium">Delivery Charges:</span>
                            <span className="font-medium">${deliveryCharges.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold border-t border-gray-300 pt-3">
                            <span>Total Amount:</span>
                            <span className="text-primary">${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartItems