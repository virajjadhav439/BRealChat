import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const Navbar = ({darkMode,setDarkMode}) => {
  return (
    <>
    <motion.nav
  initial={{
    opacity: 0,
    y: -20
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.6
  }}
  className={`
flex
items-center
justify-between
px-4
md:px-8
py-4
border-b
transition

${
  darkMode
    ? "bg-zinc-900 border-zinc-800 text-white"
    : "bg-white border-gray-200 text-black"
}
`}
>

  {/* Logo */}
  <div className="flex items-center gap-3">

    <div
      className="
      w-8
      h-8
      md:w-20
      md:h-20
      rounded-full
      bg-green-500
      text-white
      flex
      items-center
      justify-center
      font-bold
      text-m
      md:text-4xl

      "
    >
      B
    </div>

    <h1
  className="
  hidden
  md:block
  text-2xl
  font-bold
  "
>
  BRealChat
</h1>

  </div>

  {/* Links */}

  <div className="hidden md:flex gap-8">

    <a
  href="#features"
  className="
  relative
  group
  "
>
  Features

  <span
    className="
    absolute
    left-0
    -bottom-1
    h-0.5
    w-0
    bg-green-500
    transition-all
    duration-300
    group-hover:w-full
    "
  />
</a>

    <a
  href="#tech"
  className="
  relative
  group
  "
>
  Tech Stack

  <span
    className="
    absolute
    left-0
    -bottom-1
    h-0.5
    w-0
    bg-green-500
    transition-all
    duration-300
    group-hover:w-full
    "
  />
</a>

  </div>

  {/* Buttons */}

  <div className="flex gap-3">

<motion.button
  whileHover={{
    scale:1.05
  }}
  whileTap={{
    scale:0.95
  }}
  onClick={()=>
    setDarkMode(!darkMode)
  }
  className={`
    px-3
    py-2
    rounded-lg
    border
    ${
      darkMode
        ? "border-zinc-700 bg-zinc-800"
        : "border-gray-300 bg-white"
    }
  `}
>
  {darkMode ? "☀️" : "🌙"}
</motion.button>

<Link to="/login">
    <motion.button
      className={`
px-3
md:px-4
py-2
rounded-lg
border

${
  darkMode
    ? "border-zinc-700"
    : "border-gray-300"
}
`}
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.95
      }}
    >
  Login
    </motion.button>
</Link>

    <Link to="/signup">
    <motion.button
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.95
      }}
      className="
px-3
md:px-4
py-2
rounded-lg
bg-green-500
text-white
text-sm
md:text-base
"
    >
  Get Started

    </motion.button>
</Link>

  </div>

</motion.nav>
    </>
  )
}

export default Navbar