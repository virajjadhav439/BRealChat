import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HeroSection = ({darkMode}) => {
  return (<>
    <section
  className="
    min-h-[90vh]
    flex
    flex-col
    items-center
    justify-center
    text-center
    px-6
  "
>

  <motion.h1
    initial={{
      opacity:0,
      y:40
    }}
    animate={{
      opacity:1,
      y:0
    }}
    transition={{
      duration:0.8
    }}
    className="
    text-5xl
    flex
    justify-center
    md:text-6xl
    font-bold
    "
  >
    BRealChat
  </motion.h1>

  <motion.p
  initial={{
    opacity:0,
    y:40
  }}
  animate={{
    opacity:1,
    y:0
  }}
  transition={{
    duration:0.8,
    delay:0.2
  }}
  className="
    mt-6
    text-lg
    md:text-xl
    text-gray-500
    max-w-2xl
    mx-auto
    text-center
    leading-relaxed
  "
>
  Real-time messaging powered by React,
  Socket.IO, MongoDB and Google Authentication.
</motion.p>

  <motion.div
    initial={{
      opacity:0,
      y:40
    }}
    animate={{
      opacity:1,
      y:0
    }}
    transition={{
      duration:0.8,
      delay:0.4
    }}
    className="
    flex
    gap-4
    mt-8
    flex-wrap
    justify-center
    "
  >

      <Link to="/signup">
    <motion.button
      whileHover={{
        scale:1.05
      }}
      whileTap={{
        scale:0.95
      }}
      className="
      bg-green-500
      text-white
      px-6
      py-3
      rounded-lg
      "
    >
  Get Started
    </motion.button>
</Link>
    

<a href="#features">
    <motion.button
      whileHover={{
        scale:1.05
      }}
      whileTap={{
        scale:0.95
      }}
      className="
      border
      border-gray-300
      px-6
      py-3
      rounded-lg
      "
    >
  Learn More
    </motion.button>
</a>

  </motion.div>

</section>
  </>
  )
}

export default HeroSection