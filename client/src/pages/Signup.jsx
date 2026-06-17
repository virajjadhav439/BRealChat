import React, { useState } from 'react'
import API from '../api/api'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as openpgp from 'openpgp'
const Signup = ({ darkMode, setDarkMode }) => {
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
    return toast.error("Passwords do not match")
}
//Generate Key Pair
const {privateKey,publicKey}=await openpgp.generateKey({
  type:'ecc',
  curve:'curve25519',
  userIDs:[{
    name:formData.username,
    email:formData.email,
  }]
})
//Store Private Key Locally
localStorage.setItem("privateKey",privateKey)

            //  send post request to backend/server
            await API.post('/auth/signup',{
            username: formData.username,
            email: formData.email,
            password: formData.password,
            publicKey,
        })
        
        //login successful confirmation message
    toast.success("Account Signup Successfully")
    navigate('/login')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Signup Failed')
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
          Signup
        </h1>

        <h3
          className={`text-center mb-6 ${
            darkMode
              ? "text-zinc-400"
              : "text-gray-500"
          }`}
        >
          Start Connecting. Start Chatting.
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border mb-4 outline-none ${
              darkMode
                ? "bg-zinc-700 border-zinc-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border mb-4 outline-none ${
              darkMode
                ? "bg-zinc-700 border-zinc-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border mb-4 outline-none ${
              darkMode
                ? "bg-zinc-700 border-zinc-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border mb-6 outline-none ${
              darkMode
                ? "bg-zinc-700 border-zinc-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />

          <button
            type="submit"
            className="w-full p-3 bg-green-500 hover:bg-green-600 transition rounded-lg text-white font-semibold cursor-pointer"
          >
            Signup
          </button>
          <p className='flex justify-center m-2 text-gray-500'>
            Already have a Account?
          <Link className='underline' to="/login">
            Login
          </Link>
          
          </p>
        </form>
      </div>
    </div>
  </>
)
}

export default Signup