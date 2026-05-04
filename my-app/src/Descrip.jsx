import React from 'react';
import { AiOutlineCode } from "react-icons/ai"; // Example icon

const Descrip = () => {
  return (
    <div className=' mt-15 relative w-full max-w-5xl mx-auto overflow-hidden
      bg-gradient-to-br from-slate-900 via-green-900 to-green-800 
      rounded-3xl p-10 shadow-2xl border border-white/10
      hover:-translate-y-1 transition-all duration-500 group '>
      
      {/* Background Decorative Blob */}
      <div className="absolute -bottom-10 -left-20 w-80 h-64 bg-yellow-200/50 rounded blur-[90px]
       group-hover:bg-green-100/50 transition-colors"></div>

      <div className="relative z-1 flex flex-col md:flex-row items-start gap-10">
        
        {/* Left Side: Icon or Profile Circle */}
        <div className="bg-green-500/20 p-3 rounded-2xl border border-yellow-400/30">
          <AiOutlineCode className="text-5xl text-yellow-400" />
        </div>

        {/* Right Side: Content */}
        <div className='flex-1 justify-center'>
          <div className="bg-green-500/20 w-43 text-center text-green-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full 
          border border-green-500/30 group-hover:bg-green-300/20">
            Developer Insight
          </div>
          
          <h2 className='text-4xl font-black mt-4 mb-4 text-white tracking-tight'>
            Built for <span className="text-green-400">Privacy</span> & Speed.
          </h2>
          
          <p className='text-green-100/80 text-lg leading-relaxed max-w-2xl font-light'>
            Hi, I'm the Pranjal Saroj.This is and Image Compression tool. I built this tool with the help of Python for backend & React, Tailwind CSS for frontend.
            Im  still adding new features to it and Gaining New knowledge.It is also helping me improve my skills.
          </p>

          <div className="mt-8 flex gap-4">
             <div className="h-1 w-20 bg-green-500 rounded-full"></div>
             <div className="h-1 w-8 bg-green-500/30 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Descrip;