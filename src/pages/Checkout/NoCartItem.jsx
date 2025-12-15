import React from 'react'
import Container from '../../components/Shared/Container'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NoCartItem = () => {
    return (
        <Container>
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                <div className="mb-6">
                    <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">কোন প্রোডাক্ট নেই</h2>
                </div>
                <Link
                    to="/"
                    className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
                >
                    অন্যান্য পণ্য দেখতে ক্লিক করুন
                </Link>
            </div>
        </Container>
    )
}

export default NoCartItem
