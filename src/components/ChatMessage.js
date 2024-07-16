// src/components/ChatMessage.js
import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`px-4 py-2 mt-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
            {message.text}
          </div>
        </div>

  );
};

export default ChatMessage;
