import React, { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import axios from 'axios';
import './style.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [sessionId, setSessionId] = useState(null); 
  const [chatSessions, setChatSessions] = useState([]);
  const chatContainerRef = useRef(null); 

  const handleSendMessage = async (newMessage) => {
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setIsLoading(true); 
    console.log("request",sessionId,"message",newMessage)
    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        sessionId,
        message: newMessage 
      });
      const data = response.data;
      console.log("Response from backend", data);
      setSessionId(data.sessionId)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsLoading(false); 
  };

  const handleNewChat = async () => {
    fetchChatSessions();
    setMessages([]); 
    try {
      const response = await axios.post('http://localhost:3001/api/chat/new', { message: "New Chat" });
      const data = response.data;
      setSessionId(data.sessionId);
      setMessages([{ text: "New Chat", sender: 'user' }, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error creating new chat session:', error);
    }
  };

  const loadChatSession = async (sessionId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/chat/${sessionId}`);
      const data = response.data;
      setMessages(data.messages);
      setSessionId(sessionId);
    } catch (error) {
      console.error('Error loading chat session:', error);
    }
    setIsLoading(false);
  };

  const fetchChatSessions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/chats');
      
      setChatSessions(response.data);
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
    }
  };

  useEffect(() => {
    fetchChatSessions();
  }, []);

  useEffect(() => {
    
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);
  console.log("Session",chatSessions)


  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 bg-gray-100">
        <button 
          onClick={handleNewChat} 
          className="w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          New Chat
        </button>
        <h2 className="text-lg font-semibold mb-2">Previous Chats</h2>
        <ul>
          {chatSessions.map((chat) => (
            <li key={chat.sessionId} className="mb-2">
              <button 
                onClick={() => loadChatSession(chat.sessionId)} 
                className="w-full text-left p-2 bg-white rounded shadow hover:bg-gray-100"
              >
                Chat {chat.initialMessage}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col w-3/4 h-full p-4 bg-white shadow-md rounded-lg">
        <div className="flex-1 overflow-auto" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-center my-2">
              <div className="dot-loader">
                <div className="dot1"></div>
                <div className="dot2"></div>
                <div className="dot3"></div>
              </div>
            </div>
          )}
        </div>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
