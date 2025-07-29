import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { remove } from '../redux/Slices/CartSlice';

const CartItem = ({ item, itemIndex }) => {
    const dispatch = useDispatch();

    const removeFromCart = () => {
        dispatch(remove(item.id));
        toast.success("Item Removed");
    }

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 border-b py-6 px-4 md:px-8 hover:shadow-md transition-shadow duration-300">

            <div className="w-full md:w-40 h-40 flex justify-center items-center">
                <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain h-full w-full"
                />
            </div>

            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-xl font-semibold text-gray-800">{item.title}</h1>
                <p className="text-gray-600 text-sm">{item.description}</p>

                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-green-600">₹{item.price}</p>

                    <button
                        onClick={removeFromCart}
                        className="text-red-600 hover:text-red-800 transition-colors text-2xl"
                        title="Remove from Cart"
                    >
                        <MdDeleteForever />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CartItem
