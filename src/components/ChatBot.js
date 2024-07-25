import React, {useEffect, useRef, useState} from "react";
import chatBot from "../../public/images/chatbot/chatbot.svg"
import crossIcon from "../../public/images/cross_icon.svg"
import helpBot from "../../public/images/chatbot/HelpBot.svg"
import greenDot from "../../public/images/chatbot/greendot.svg"
import send from "../../public/images/chatbot/send.svg"

import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import {setListInLocalStorage, getListFromLocalStorage} from "@/utils/localStorage";

export default function ChatBot() {
    const [chatState, setChatState] = useState(false)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef(null);
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);
  //
  // const scrollToBottom = () => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
    useEffect(() => {
      const feed = document.getElementById('chat-feed');
      feed.scrollTop = feed.scrollHeight;

  }, [messages]);

    useEffect(() => {
        const botMessages = getListFromLocalStorage('botMessages')
        console.log(botMessages)
        if (botMessages) {
            setMessages(botMessages);
        }
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
      };

    const handleSendMessage = () => {
        if (input.trim()) {
          const newMessage = { text: input, sender: 'user' };
          setMessages([...messages, newMessage]);
          setInput('');
          receiveMessage(newMessage); // Simulate receiving a response
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSendMessage();
        }
    };

    const receiveMessage = async (text) => {
        text = text.text
        const userID = localStorage.getItem("userID")
        // Mock response from backend
        await axiosInstance.post("/chatbot", {userID, text}).then((resp) => {
            const botMessage = {text: resp.data.message, sender: 'bot'};
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setListInLocalStorage('botMessages', messages );
        })
    };

    return (
        <>
            <div className="fixed sm:bottom-10 sm:right-10 bottom-4 right-4">
                <button
                    id={`Chatbot`}
                    className={`cursor-pointer fixed sm:bottom-10 sm:right-10 bottom-4 right-4 ${chatState ? "hidden" : "inline-block"}`}
                    onClick={() => setChatState(!chatState)}
                >
                    <Image className="w-[12.5vw] sm:w-[10vw] lg:w-[3.5vw]" src={chatBot} />
                </button>
                <div className={`bg-white rounded-xl overflow-hidden lg:w-[20vw] lg:h-[30vw] 
                md:w-[55vw] md:h-[65vw] sm:w-[50vw] sm:h-[65vw] w-[65vw] h-[90vw] 
                drop-shadow-lg ${chatState ? "animate-grow" : "animate-shrink"}`}>
                    <div className="bg-darkblue sm:py-3 py-2 flex justify-between items-center">
                        <div className="flex sm:ml-4 ml-2 items-center">
                            {/*Avatar Bot*/}
                            <div className="lg:w-[2.5vw] sm:w-[5.5vw] w-[7.5vw]">
                                <Image src={helpBot} alt="Bot Picture"/>
                            </div>
                            <div className="sm:ml-4 ml-2">
                                <h1 className="lg:text-[0.8vw] sm:text-[2.5vw] text-[3vw] text-white">HelpBot</h1>
                                <div className="text-[#43EE7D] flex items-center space-x-1">
                                    <Image className="lg:w-[0.3vw] sm:w-[0.8vw] w-[1.0vw] inline-block" src={greenDot} />
                                    <span className="lg:text-[0.8vw] sm:text-[1.4vw] text-[2.6vw]">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="mr-4">
                            <Image onClick={() => setChatState(!chatState)} className="w-[4.5vw] sm:w-[3.5vw] md:w-[4vw] lg:w-[1.3vw]" src={crossIcon} />
                        </div>
                    </div>
                    <div id="chat-feed" className="overflow-y-scroll px-4 sm:py-2 py-1
                     lg:h-[21.5vw] md:h-[37.5vw] sm:h-[43vw] h-[62vw] w-full">
                        <div className="my-2 py-2 px-4 w-3/4 rounded-2xl clear-both bg-[#C6E8FA] float-left text-black">
                            <h4 className="lg:text-[0.8vw] sm:text-[2vw] text-[2.5vw]">
                                Hi, I am the Enable ID FAQ Chatbot. Ask me any questions about this website and I will try to answer them.
                                You can ask questions such as &quot;How do I upload a document&quot; or &quot;Where do I find the resources available&quot;.
                            </h4>
                        </div>
                        {messages.map((message, index) => (
                          <div
                            id="botMessages"
                            key={index}
                            className={`py-2 px-4 my-2 rounded-2xl max-w-[70%] clear-both ${
                              message.sender === 'user' ? 'bg-darkblue float-right text-white' : 'bg-[#C6E8FA] float-left text-black'
                            }`}
                          >
                              <h4 className="lg:text-[0.8vw] sm:text-[2vw] text-[2.5vw]">
                                {message.text}
                              </h4>
                            </div>
                            ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="bg-white absolute bottom-0 w-full">
                        <hr className="border-t-2 border-[#B0B0B0]/50 mx-auto" />
                        <div className="flex items-center mx-3 lg:my-3 my-4">
                            <input id='Input' className="placeholder:text-slate-400 placeholder:sm:text-[2vw] placeholder:text-[2.5vw] placeholder:lg:text-[0.7vw]
                            text-slate-400 lg:text-[0.7vw] sm:text-[2vw] text-[2.5vw] bg-[#E8EBF0] w-10/12 rounded-full
                            lg:py-2 sm:py-4 py-2 px-5 mx-2 focus:outline-none focus:ring-sky-500 focus:ring-1"
                                   placeholder="Type your message here ..." value={input} onChange={handleInputChange}
                            onKeyDown={handleKeyPress}/>
                            <Image className="ml-2 sm:w-[4vw] w-[5vw] lg:w-[1.6vw]" onClick={handleSendMessage} src={send} alt="Send button"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}