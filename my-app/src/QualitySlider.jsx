import React from 'react';

const QualitySlider = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <label className="text-slate-700 font-bold">Compression Level</label>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
          {value}%
        </span>
      </div>
      <input 
        type="range" 
        min="10" 
        max="100" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-2 italic">
        <span>Smaller File</span>
        <span>Better Quality</span>
      </div>
    </div>
  );
};

export default QualitySlider;