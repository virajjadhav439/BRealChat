import React from "react";
import { motion } from "framer-motion";

const Features = ({darkMode}) => {
  return (
    <>
      <section id="features"
        className={`
p-6
rounded-2xl
border
transition
m-2
${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"}
`}
      >
        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
    text-4xl
    font-bold
    text-center
    relative
    group
    "
        >
          Features
        </motion.h2>

        <div
          className="
    mt-16
    grid
    md:grid-cols-2
    lg:grid-cols-4
    gap-6
    "
        >
          {/* Card 1 */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className={`
p-6
md:pb-50
rounded-2xl
border
transition
${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"}
`}
          >
            <h3 className="text-xl font-semibold">⚡ Realtime Chat</h3>

            <p
              className={`
mt-3
${darkMode ? "text-gray-400" : "text-gray-500"}
`}
            >
              Send and receive messages instantly using Socket.IO.
            </p>
          </motion.div>

          {/* Card 2 */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className={`
p-6
md:pb-50
rounded-2xl
border
transition
${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"}
`}
          >
            <h3 className="text-xl font-semibold">🟢 Online Presence</h3>

            <p
              className={`
mt-3
${darkMode ? "text-gray-400" : "text-gray-500"}
`}
            >
              See who is online in real time.
            </p>
          </motion.div>

          {/* Card 3 */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className={`
p-6
md:pb-50
rounded-2xl
border
transition
${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"}
`}
          >
            <h3 className="text-xl font-semibold">⌨️ Typing Indicator</h3>

            <p
              className={`
mt-3
${darkMode ? "text-gray-400" : "text-gray-500"}
`}
            >
              Know when someone is typing.
            </p>
          </motion.div>

          {/* Card 4 */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className={`
p-6
md:pb-50
rounded-2xl
border
transition
${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"}
`}
          >
            <h3 className="text-xl font-semibold">🔒 Secure Authentication</h3>

            <p
              className={`
mt-3
${darkMode ? "text-gray-400" : "text-gray-500"}
`}
            >
              JWT authentication and Google OAuth.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;
