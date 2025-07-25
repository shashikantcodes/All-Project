import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';



const SignupForm = ({ setIsLoggedIn }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [accountType, setAccountType] = useState("student");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();


    function changeHandler(event) {

        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value,
            }
        ))

    }

    function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passswords do not match");
            return;
        }

        setIsLoggedIn(true);
        toast.success("Signup Succesful");
        const accountData = {
            ...formData
        };

        const finalData = {
            ...accountData,
            accountType
        }

        console.log(finalData)

        navigate("/dashboard");
    }

    return (
        <div>
            {/* Student Instructor Tab */}
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
                <button
                    className={`${accountType === "student" ? " bg-richblack-900 text-richblack-5" : " bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("student")}>
                    Student
                </button >
                <button
                    className={`${accountType === "instructor" ? " bg-richblack-900 text-richblack-5" : " bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("instructor")}>
                    Instructor
                </button>
            </div>

            <form
                onSubmit={submitHandler}>
                {/* First Name and Last name */}
                <div className='flex justify-between mt-[20px] '>
                    <label  >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name <sup className='text-pink-200'>*</sup></p>

                        <input
                            type="text"
                            required
                            name='firstName'
                            onChange={changeHandler}
                            placeholder='Enter your first name'
                            value={formData.firstName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                        />
                    </label>

                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name <sup className='text-pink-200'>*</sup></p>

                        <input
                            type="text"
                            required
                            name='lastname'
                            onChange={changeHandler}
                            placeholder='Enter your last name'
                            value={formData.lastname}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                        />
                    </label>
                </div>
                {/* Email Add */}
                <div className='mt-[20px]'>
                    <label className='w-full mt-[20px] ' >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address <sup className='text-pink-200'>*</sup></p>

                        <input
                            type="email"
                            required
                            name='email'
                            onChange={changeHandler}
                            placeholder='Enter your Email Address'
                            value={formData.email}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                        />
                    </label>
                </div>


                {/* Create Passsword and Confrim Password */}
                <div className='flex  w-full justify-between mt-[20px]'>
                    <label className='relative'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password <sup className='text-pink-200'>*</sup></p>

                        <input
                            type={showPassword ? ("text") : ("password")}
                            required
                            name='password'
                            onChange={changeHandler}
                            placeholder='Enter password'
                            value={formData.password}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => { setShowPassword((prev) => !prev) }}>
                            {
                                showPassword ? (<IoEyeOutline fontSize={24} fill='#AFB2BF' />) : (<IoEyeOffOutline fontSize={24} fill='#AFB2BF' />)
                            }
                        </span>
                    </label>

                    <label className='relative' >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password <sup className='text-pink-200'>*</sup></p>

                        <input
                            type={showConfirmPassword ? ("text") : ("password")}
                            required
                            name='confirmPassword'
                            onChange={changeHandler}
                            placeholder=' Confirm password'
                            value={formData.confirmPassword}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => { setShowConfirmPassword((prev) => !prev) }}>
                            {
                                showConfirmPassword ? (<IoEyeOutline fontSize={24} fill='#AFB2BF' />) : (<IoEyeOffOutline fontSize={24} fill='#AFB2BF' />)
                            }
                        </span>
                    </label>
                </div>

                <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-full' >Create Account</button>
            </form>

        </div>
    );
};

export default SignupForm;