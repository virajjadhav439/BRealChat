import React from 'react'

const Footer = ({darkMode,setDarkMode}) => {
  return (
    <>
    <footer
  className={`
    py-8
    text-center
    border-t
    ${
      darkMode
        ? "border-zinc-800 text-gray-400"
        : "border-gray-200 text-gray-500"
    }
  `}
>

  <p>
    Built by Viraj • 2026
  </p>

</footer>
    </>
  )
}

export default Footer