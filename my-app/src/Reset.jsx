import React from 'react';

const Reset = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="bg-green-600 hover:bg-green-500 text-white font-black py-4 px-8 rounded-xl 
      shadow-xl transition-all active:scale-95 text-lg mt-6"
        >
      RESET
    </button>
  );
};

export default Reset;