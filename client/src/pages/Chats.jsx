import React, { useEffect, useRef, useState } from 'react'
import API from '../api/api'
import socket from '../socket/socket'

const Chats = ({ darkMode, setDarkMode }) => {
    const [users,setUsers] = useState([])
    const [selectedUser,setSelectedUser] = useState()
    const [conversation,setConversation] = useState(null)
    const [messages,setMessages] = useState([])
    const [text,setText]=useState('')  
    const [search,setSearch] =useState('')
    const messagesEndRef =useRef(null)
    const [onlineUsers,setOnlineUsers]= useState([])

    // Information OF Current User
    const currentUser = JSON.parse(
        localStorage.getItem("user")
    )
    
    
    const filteredUsers = users
    .filter(user => user._id !== currentUser._id)
    .filter(user =>
        user.username
            .toLowerCase()
            .includes(search.toLowerCase())
    )
    
    
    const fetchUsers = async ()=>{
        try {
            const token = localStorage.getItem('token')

            const response = await API.get('/users',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setUsers(response.data)
            
            
        } catch (error) {
            console.log(error);
            
            

            
        }
    }

    const handleUserSelect = async(user)=>{
        setSelectedUser(user)
        const token = localStorage.getItem('token')

        const response = await API.post(
            '/conversations',
            {
                receiverId:user._id
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        // Fetch Conversation
        setConversation(response.data)
        
    }

    const fetchMessages = async (conversationId)=>{
        try {
            const token = localStorage.getItem("token")

            const response = await API.get(`/messages/${conversationId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setMessages(response.data)
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
    //Load each time the page reloads
    useEffect(()=>{
        fetchUsers()
    },[])

    const sendMessage = async ()=>{

    if(!text.trim()) return

    const token = localStorage.getItem("token")

    await API.post(
        "/messages",
        {
            conversationId:conversation._id,
            text:text
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )

    socket.emit(
        "sendMessage",
        {
            text:text,
            sender:currentUser._id
        }
    )

    await fetchMessages(conversation._id)

    setText('')
}

    //Load when ConVersation Changes
    useEffect(()=>{
        if(conversation){
            fetchMessages(conversation._id)
        }
    },[conversation])

    useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({
        behavior:"smooth"
    })

},[messages])

useEffect(() => {

    console.log("Socket Object:", socket)

    socket.on("connect", () => {
        console.log(
            "Connected:",
            socket.id
        )
    })

}, [])

useEffect(()=>{

    socket.on(
        "receiveMessage",
        (message)=>{

            setMessages((prev)=>[
                ...prev,
                {
                    _id:Date.now(),
                    text:message.text,
                    sender:message.sender
                }
            ])

        }
    )

    return ()=>{
        socket.off("receiveMessage")
    }

},[])
//Registers Users "Who Am i"
useEffect(()=>{
    socket.emit("addUser",currentUser._id)
},[])

// Listen For Online Users
useEffect(()=>{
    socket.on("onlineUsers",(users)=>{
        console.log("Online Users: ",users);
        setOnlineUsers(users)
    })
    return ()=>{
        socket.off("onlineUsers")
    }
},[])

  return (<>
    {/* Chats page */}
    <div>
        {/* Chats Container */}
        <div
  className={`min-h-screen flex ${
    darkMode
      ? "bg-zinc-900 text-white"
      : "bg-white text-black"
  }`}
>

            {/* Users Container - sidebar */}
        <div
  className={`w-1/4 p-4 border-r ${
    darkMode
      ? "border-zinc-700 bg-zinc-800"
      : "border-gray-300 bg-white"
  }`}
>
            {/* Users Heading */}
            <div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl font-bold">
    Chats
  </h1>

  <button
    onClick={() => setDarkMode(!darkMode)}
    className="px-3 py-1 rounded bg-green-300 text-white"
  >
    {darkMode ? "☀️" : "🌙"}
  </button>
</div>

            {/* Search Box */}
            <div className=''>
                {/* Search Input */}
            <input
  type="text"
  placeholder="Search Users..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  className={`w-full p-3 rounded-lg border mb-4 outline-none ${
    darkMode
      ? "bg-zinc-700 border-zinc-600 text-white"
      : "bg-white border-gray-300"
  }`}
/>

            </div>
            {/* User Container inside is the User Array */}
            <div className="space-y-2 cursor-pointer">
                {/* Profile Photo */}
                <div>   

                </div>
                {/* Usernames */}
                {
  filteredUsers.map((user) => {

    const isOnline =
      onlineUsers.includes(user._id)

    return (
      <div
        key={user._id}
        onClick={() => handleUserSelect(user)}
        className={`p-3 rounded-lg cursor-pointer transition ${
          selectedUser?._id === user._id
            ? "bg-green-500 text-white"
            : darkMode
            ? "hover:bg-zinc-700"
            : "hover:bg-gray-100"
        }`}
      >

        <div className="flex items-center gap-2">

          <div
            className={`w-3 h-3 rounded-full ${
              isOnline
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          />

          <h3>
            {user.username}
          </h3>

        </div>

      </div>
    )

  })
}
            </div>
        </div>

        {/* Chat window Container */}
        <div className='flex-1 flex flex-col'>
            {/* Chat Window Heading */}
            <h1
  className={`p-4 text-xl font-semibold border-b ${
    darkMode
      ? "border-zinc-700"
      : "border-gray-300"
  }`}
>
    {selectedUser
        ? selectedUser.username
        : "Select a Chat"}
</h1>
            {/* Chat Container */}
            <div>
            {/* one Message one Div */}
            <div className='flex-1 p-4'>
            {
  messages.map((message)=>{

    const isMyMessage =
      message.sender === currentUser._id

    return(
      <div
        key={message._id}
        className={`flex ${
          isMyMessage
            ? "justify-end"
            : "justify-start"
        } mb-2`}
      >

        <div
          className={`
            max-w-xs
            px-4
            py-2
            rounded-2xl
            ${
              isMyMessage
                ? "bg-green-500 text-white rounded-3xl rounded-br-md"
                : darkMode
? "bg-zinc-700 text-white rounded-3xl rounded-bl-md"
: "bg-gray-300 text-black rounded-3xl rounded-bl-md"
            }
          `}
        >
          {message.text}
        </div>
      </div>
    )

  })
}
<div ref={messagesEndRef}></div>
            </div>
            {/* Text Box */}
            <textarea
  value={text}
  onChange={(e)=>setText(e.target.value)}
  placeholder="Type a message..."
  className={`w-full p-3 rounded-lg border outline-none ${
    darkMode
      ? "bg-zinc-800 border-zinc-700 text-white"
      : "bg-white border-gray-300"
  }`}
/>
            {/* Send Button */}
            <button
  onClick={sendMessage}
  className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer transition'
>
  Send
</button>
            
            </div>
        </div>

        </div>
    </div>
</>
  )
}

export default Chats