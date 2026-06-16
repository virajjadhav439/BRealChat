import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const CTA = ({darkMode,setDarkMode}) => {
  return (<>
    <section
  className={`
    py-28
    px-6
    text-center
    ${
      darkMode
        ? "bg-zinc-900 text-white"
        : "bg-white text-black"
    }
  `}
>

  <motion.h2
    initial={{
      opacity:0,
      y:30
    }}
    whileInView={{
      opacity:1,
      y:0
    }}
    viewport={{
      once:true
    }}
    className="
      text-4xl
      md:text-5xl
      font-bold
    "
  >
    Ready to Start Chatting?
  </motion.h2>

  <motion.p
    initial={{
      opacity:0,
      y:30
    }}
    whileInView={{
      opacity:1,
      y:0
    }}
    transition={{
      delay:0.2
    }}
    viewport={{
      once:true
    }}
    className={`
      mt-6
      text-lg
      max-w-2xl
      mx-auto
      ${
          darkMode
          ? "text-gray-400"
          : "text-gray-500"
      }
      `}
  >
    Experience real-time messaging with
    online presence, typing indicators,
    Google Authentication and read receipts.
  </motion.p>

<Link to="/login">
  <motion.button
    whileHover={{
      scale:1.05
    }}
    whileTap={{
      scale:0.95
    }}
    className="
      mt-10
      px-8
      py-4
      rounded-xl
      bg-green-500
      text-white
      font-semibold
    "
  >
    Launch BRealChat
  </motion.button>

</Link>

</section>
  </>
  )
}

export default CTA