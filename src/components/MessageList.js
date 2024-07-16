import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="p-4 space-y-4">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
