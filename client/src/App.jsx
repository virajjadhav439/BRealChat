import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chats from './pages/Chats'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home'
function App() {
  const [darkMode,setDarkMode] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/login' element={<Login darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/signup' element={<Signup darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path='/chats' element={<Chats darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        </Routes>
        <Toaster position='top-center'/>
      </BrowserRouter>
    </>
  )
}

export default App
