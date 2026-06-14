import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../api/api'
import toast from 'react-hot-toast'
import { GoogleLogin } from '@react-oauth/google'

const Login = ({ darkMode, setDarkMode }) => {
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
        
        localStorage.setItem("token",response.data.token)

        localStorage.setItem("user",JSON.stringify(response.data.user))
        
        //login successful confirmation message
    toast.success("Account login Successfully")
    

    navigate('/Chats')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Login Failed')
            console.log(error);
            
        }
    
}
  return (
  <>
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-zinc-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${
          darkMode
            ? "bg-zinc-800 text-white"
            : "bg-white text-black"
        }`}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">
          Login
        </h1>

        <h3
          className={`text-center mb-6 ${
            darkMode
              ? "text-zinc-400"
              : "text-gray-500"
          }`}
        >
          Continue Connecting. Continue Chatting.
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username/Email"
            className={`w-full p-3 rounded-lg border mb-4 outline-none ${
              darkMode
                ? "bg-zinc-700 border-zinc-600 text-white"
                : "bg-white border-gray-300"
            }`}
            onChange={handleChange}
            value={formData.identifier}
            name="identifier"
          />

          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 rounded-lg border mb-4 outline-none ${
              darkMode
                ? "bg-zinc-700 border-zinc-600 text-white"
                : "bg-white border-gray-300"
            }`}
            onChange={handleChange}
            value={formData.password}
            name="password"
          />

          <button
            type="submit"
            className="w-full p-3 bg-green-500 hover:bg-green-600 transition rounded-lg text-white font-semibold cursor-pointer"
          >
            Login
          </button>
        </form>
      <div className='mt-4 flex justify-center'>
        <GoogleLogin
        onSuccess={async (credentialResponse)=>{
          try {
      const response = await API.post('/auth/google',{
        token:credentialResponse.credential
      })
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("user",JSON.stringify(response.data.user))
    
    //login successful confirmation message
toast.success("Account login Successfully")
navigate('/Chats')

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Google Login Failed"
      )
      console.log(error);
      
    }
        }}
        onError={()=>{
          console.log("Google Login Failed");
        }}/>
      </div>
      </div>
    </div>
  </>
)
}

export default Login