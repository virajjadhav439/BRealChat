import React, { useState } from 'react'

const Login = () => {
    const [formData,setFormData] = useState({
    identifier:'',
    password:'',
})
const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}
  return (<>
    {/* Login Page */}
    <div className='min-h-screen flex items-center justify-center'>
        {/* Login Container */}
    <div className='w-full max-w-md p-6 border rounded-lg'>
        {/* Login Heading */}
        <h1 className='text-2xl font-bold mb-4' >Login</h1>
        {/* Login SubHeading */}
        <h3 className='text-s mb-4'>Continue Connecting.Continue Chatting</h3>
        {/* login Form */}
        <form action="">
            {/* Indentifier Input */}
            <input type="text" placeholder='Username/Email' className='w-full border p-2 mb-3'/>
            {/* Password Input */}
            <input type="password" placeholder='Password' className='w-full border p-2 mb-3'/>
            {/* Submit Button */}
            <button className='w-full p-2 bg-black text-white cursor-pointer'>Login</button>
        </form>
    </div>
    </div>
  </>
  )
}

export default Login