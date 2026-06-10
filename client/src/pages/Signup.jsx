import React, { useState } from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [formData,setFormData] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    })

    const navigate = useNavigate()
const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}

const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      //Check if passwords match
      if(formData.password !== formData.confirmPassword){
    return alert("Passwords do not match")
}
            //  send post request to backend/server
            await API.post('/auth/signup',{
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
        
        //login successful confirmation message
    alert("Account Signup Successfully")
    navigate('/login')
        } catch (error) {
            alert(error?.response?.data?.message || 'Signup Failed')
        }
    
}
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
        <form action="" onSubmit={handleSubmit}>
            {/* Username input */}
            <input type="text" name='username'  value={formData.username} placeholder='Username' className='w-full border p-2 mb-3' onChange={handleChange}/>
            {/* Email Input */}
            <input type="email" name='email' value={formData.email} placeholder='Email' className='w-full border p-2 mb-3' onChange={handleChange}/>
            {/* Password */}
            <input type="password" name='password' value={formData.password} placeholder='Password' className='w-full border p-2 mb-3' onChange={handleChange}/>
            {/* Confirm Password */}
            <input type="password" name='confirmPassword' value={formData.confirmPassword} placeholder='Confirm Password' className='w-full border p-2 mb-3' onChange={handleChange}/>
            {/* Profile Pic */}
            
            {/* signup Button */}
            <button type='submit' className="w-full p-2 bg-black text-white">Signup</button>
        </form>
    </div>
    </div>
  </>
    
  )
}

export default Signup