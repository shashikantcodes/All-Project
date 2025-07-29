import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import { Link } from 'react-router-dom'

const Cart = () => {

    const { cart } = useSelector((state) => state)
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
    }, [cart]);

    return (
        <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-50">

            {
                cart.length > 0 ? (
                    <div className="flex flex-col md:flex-row gap-12">

                        {/* Cart Items */}
                        <div className="flex-1">
                            {
                                cart.map((item, index) => (
                                    <CartItem key={item.id} item={item} itemIndex={index} />
                                ))
                            }
                        </div>

                        {/* Summary Section */}
                        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl p-6 h-fit">
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                                <h3 className="text-lg font-medium text-gray-600 mt-2">Summary</h3>
                                <p className="text-gray-700 mt-2">Total Items: <span className="font-semibold">{cart.length}</span></p>
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-lg font-semibold text-gray-700 mb-4">
                                    Total Amount: <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
                                </p>
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-300">
                                    Check Out Now
                                </button>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center mt-20">
                        <h1 className="text-3xl font-bold text-gray-700 mb-6">Your Cart is Empty</h1>
                        <Link to="/" className="inline-block">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg transition duration-300">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}

export default Cart
