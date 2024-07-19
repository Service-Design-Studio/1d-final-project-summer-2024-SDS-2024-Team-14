import React, {useEffect, useRef, useState} from "react";
import chatBot from "../../public/images/chatbot/chatbot.svg"
import crossIcon from "../../public/images/cross_icon.svg"
import helpBot from "../../public/images/chatbot/HelpBot.svg"
import greenDot from "../../public/images/chatbot/greendot.svg"
import send from "../../public/images/chatbot/send.svg"

import Image from "next/image";
import EnableId from "../../public/images/enable_id_logo.svg";

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
    //     // id of the chat container ---------- ^^^
    //     if (el) {
    //       el.scrollTop = el.scrollHeight;
    //     }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSendMessage();
        }
    };

    const receiveMessage = (userMessage) => {
        // Mock response from backend
        setTimeout(() => {
          const botMessage = { text: `What you want?`, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    };

    return (
        <>
            <div className="fixed bottom-10 right-10">
                <button
                    className={`cursor-pointer fixed bottom-10 right-10 ${chatState ? "hidden" : "inline-block"}`}
                    onClick={() => setChatState(!chatState)}
                >
                    <Image className="w-[12.5vw] sm:w-[10vw] lg:w-[3.5vw]" src={chatBot} />
                </button>
                <div className={`bg-white rounded-xl overflow-hidden w-[20vw] h-[30vw] drop-shadow-lg ${chatState ? "animate-grow" : "animate-shrink"}`}>
                    <div className="bg-darkblue py-3 flex justify-between items-center">
                        <div className="flex ml-4">
                            <div className="w-[2.5vw]">
                                <Image src={helpBot} alt="Bot Picture"/>
                            </div>
                            <div className="ml-4">
                                <h1 className="text-[0.8vw] text-white">HelpBot</h1>
                                <div className="text-[#43EE7D] flex items-center space-x-1">
                                    <Image className="w-[0.3vw] inline-block" src={greenDot} />
                                    <span className="text-[0.8vw]">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="mr-4">
                            <Image onClick={() => setChatState(!chatState)} className="w-[12.5vw] sm:w-[10vw] lg:w-[1.3vw]" src={crossIcon} />
                        </div>
                    </div>
                    <div id="chat-feed" className="overflow-y-scroll p-4 h-[21.5vw]">
                        <div className="my-2 py-2 px-4 rounded-2xl clear-both bg-[#C6E8FA] float-left text-black">
                            <h4 className="text-[0.8vw]">
                                Hi, I am the Enable ID FAQ Chatbot. Ask me any questions about this website and I will try to answer them.
                                You can ask questions such as "How do I upload a document" or "Please redirect me to the resource locator page".
                            </h4>
                        </div>
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`py-2 px-4 rounded-2xl clear-both ${
                              message.sender === 'user' ? 'bg-darkblue float-right text-white' : 'bg-[#C6E8FA] float-left text-black'
                            }`}
                          >
                              <h4 className="text-[0.8vw]">
                                {message.text}
                              </h4>
                            </div>
                            ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="bg-white absolute bottom-0 w-full">
                        <hr className="border-t-2 border-[#B0B0B0]/50 mx-auto" />
                        <div className="flex items-center mx-3 my-3">
                            <input className="placeholder:text-slate-400 placeholder:text-[0.7vw]
                            text-slate-400 text-[0.7vw] bg-[#E8EBF0] w-10/12 rounded-full
                            py-2 px-5 mx-2 focus:outline-none focus:ring-sky-500 focus:ring-1"
                                   placeholder="Type your message here ..." value={input} onChange={handleInputChange}
                            onKeyDown={handleKeyPress}/>
                            <Image className="ml-2" onClick={handleSendMessage} src={send} alt="Send button"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}