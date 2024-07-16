// src/components/ChatInput.js
import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-lg p-2"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-lg">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
