import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../api/api'
const Login = () => {
    const [formData,setFormData] = useState({
    identifier:'',
    password:'',
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
            //  send post request to backend/server
            const response = await API.post('/auth/login',{
            identifier: formData.identifier,
            password: formData.password
        })
        console.log(response.data)
        localStorage.setItem("token",response.data.token)
        //login successful confirmation message
    alert("Account login Successfully")
    

    navigate('/Chats')
        } catch (error) {
            alert(error?.response?.data?.message || 'Login Failed')
            console.log(error);
            
        }
    
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
        <form action="" onSubmit={handleSubmit}>
            {/* Indentifier Input */}
            <input type="text" placeholder='Username/Email' className='w-full border p-2 mb-3' onChange={handleChange} value={formData.identifier} name='identifier'/>
            {/* Password Input */}
            <input type="password" placeholder='Password' className='w-full border p-2 mb-3'onChange={handleChange} value={formData.password} name='password'/>
            {/* Submit Button */}
            <button type='submit' className='w-full p-2 bg-black text-white cursor-pointer'>Login</button>
        </form>
    </div>
    </div>
  </>
  )
}

export default Login