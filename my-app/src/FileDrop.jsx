import React, { useRef } from 'react';

const FileDrop = ({ fileName, onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-2xl p-12 border-4 border-dashed border-green-600 rounded-3xl bg-white flex flex-col items-center justify-center hover:bg-green-50 transition-all cursor-pointer group"
    >
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={(e) => onFileSelect(e.target.files)} // ✅ passes ALL files
        className="hidden"
        accept="image/*"
      />

      <div className="bg-green-500 p-4 rounded-xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-slate-800">
        {fileName ? fileName : "Select images"}
      </h3>
      <p className="text-slate-500">or drop images here</p>
    </div>
  );
};

export default FileDrop;