import React from 'react'
import { motion } from 'framer-motion'
const TechStack = ({darkMode,setDarkMode}) => {
  return (<>
    <section
  id="tech"
  className={`
    py-24
    px-6
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
      font-bold
      text-center
    "
  >
    Tech Stack
  </motion.h2>

  <div
    className="
      mt-16
      grid
      grid-cols-2
      md:grid-cols-4
      gap-6
      max-w-5xl
      mx-auto
    "
  >

    {[
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "Google OAuth",
      "TailwindCSS"
    ].map((tech)=>(
      <motion.div
        key={tech}
        whileHover={{
          scale:1.05
        }}
        className={`
          p-5
          rounded-xl
          text-center
          border
          ${
            darkMode
              ? "border-zinc-700 bg-zinc-800"
              : "border-gray-200 bg-white"
          }
        `}
      >
        {tech}
      </motion.div>
    ))}

  </div>

</section>
  </>
  )
}

export default TechStack