import React, { useState } from 'react'

const Signup = () => {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
  return (<>
  {/* Signup Page */}
  <div className='min-h-screen flex items-center justify-center'>
    {/* Signup Container */}
    <div className='w-full max-w-md p-6 border rounded-lg'>
        {/* Signup Heading */}
        <h1 className='text-2xl font-bold mb-4'>Signup</h1>
        {/* Signup sub-heading */}
        <h3 className='text-s mb-4'>Start Connecting.Start Chatting</h3>
        {/* signup Form */}
        <form action="">
            {/* Username input */}
            <input type="text" placeholder='Username' className='w-full border p-2 mb-3'/>
            {/* Email Input */}
            <input type="text" placeholder='Email' className='w-full border p-2 mb-3'/>
            {/* Password */}
            <input type="password" placeholder='Password' className='w-full border p-2 mb-3'/>
            {/* Confirm Password */}
            <input type="password" placeholder='Confirm Password' className='w-full border p-2 mb-3'/>
            {/* Profile Pic */}
            
            {/* signup Button */}
            <button className="w-full p-2 bg-black text-white">Signup</button>
        </form>
    </div>
    </div>
  </>
    
  )
}

export default Signup