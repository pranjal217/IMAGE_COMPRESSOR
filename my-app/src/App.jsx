import React, { useState } from 'react';
import QualitySlider from './QualitySlider';
import FileDrop from './FileDrop';
import Cards from './Cards';
import Descrip from './Descrip';
import Download from './Download';
import { GiBallHeart } from "react-icons/gi";
import callPython from './callPython.js';
import Reset from './Reset.jsx';
import Footer from './Footer.jsx';

function App() {
  const features = [
    { title: "Fast Compression", description: "Shrink images in seconds without losing quality.", icon: "⚡" },
    { title: "Bulk Upload", description: "Compress multiple images at once and let our engine handle it.", icon: "📦" },
    { title: "Secure", description: "Your photos never leave your computer. 100% private.", icon: "🔥" },
  ];

  const [quality, setQuality] = useState(70);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Ready");
  const [isSuccess, setIsSuccess] = useState(false);
  const [previews, setPreviews] = useState([]); // ✅ lowercase throughout

  const handleDragOver = (e) => e.preventDefault();

const handleDrop = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const droppedFiles = Array.from(e.dataTransfer.files);
  
  if (droppedFiles.length === 0) return;

  // ✅ Just select files, don't compress
  setFile(prev => {
    const existing = prev || [];
    const filtered = droppedFiles.filter(
      nf => !existing.some(ef => ef.name === nf.name)
    );
    const merged = [...existing, ...filtered];
    setStatus(`Selected: ${merged.length} files`);
    return merged;
  });

  setPreviews(prev => {
    const existing = prev || [];
    const newUrls = droppedFiles.map(f => ({
      url: URL.createObjectURL(f),
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB'
    }));
    const filtered = newUrls.filter(
      nu => !existing.some(eu => eu.name === nu.name)
    );
    return [...existing, ...filtered];
  });

};
  const handleCompress = async () => {
    if (!file || file.length === 0) {
      setStatus("Please select a file first!");
      return;
    }

    setIsSuccess(false);
    setPreviews([]); 
    setStatus("Compressing...");
    

    const folder = await callPython(api => api.get_save_folder());
  if (!folder) {
    setStatus("No folder selected!");
    return;
   }
    const filesToProcess = Array.isArray(file) ? file : [file];

    for (const f of filesToProcess) {
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async () => {
          const result = await callPython(api =>
            api.compress_dropped_image(reader.result, f.name, quality)
          );
          resolve(result);
        };
        reader.readAsDataURL(f);
      });
    }

    setStatus("All images processed!");
    setIsSuccess(true);
  };
const handleReset = () => {
  setFile(null);
  setPreviews([]);
  setStatus("Ready");
  setIsSuccess(false);
};

  return (
    <div 
     onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-full flex justify-center"
    className={`min-h-screen flex flex-col items-center font-sans transition-colors duration-500 ${
      isSuccess ? 'bg-green-50' : 'bg-slate-100'
    }`}>

      <nav className='w-full bg-green-500 shadow-lg p-1 py-6 pb-3 justify-center mb-9'>
        <h1 className="flex flex-col-2 text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">
          <GiBallHeart className='text-4xl text-red-500 mt-1 mx-6' />
          i<span className="text-green-200">Love</span>IMG <span className="font-light text-yellow-200">Clone</span>
        </h1>
        <p className="mx-21 flex-1 opacity-80 mb-10">Modern Image Compression Tool</p>
      </nav>

      
       
      
        <FileDrop
          fileName={file && file.length > 0 ? `${file.length} file(s) selected` : null}
          onFileSelect={(selectedFiles) => {
            const newFiles = Array.from(selectedFiles); // ✅ named newFiles

            // ✅ merge files
            setFile(prev => {
              const existing = prev || [];
              const filtered = newFiles.filter(
                nf => !existing.some(ef => ef.name === nf.name)
              );
              const merged = [...existing, ...filtered];
              setStatus(`Selected: ${merged.length} files`); // ✅ inside so count is accurate
              return merged;
            });

            // ✅ merge previews
            setPreviews(prev => {
              const existing = prev || [];
              const newUrls = newFiles.map(f => ({ // ✅ declared before use
                url: URL.createObjectURL(f),
                name: f.name,
                size: (f.size / 1024).toFixed(1) + ' KB'
              }));
              const filtered = newUrls.filter(
                nu => !existing.some(eu => eu.name === nu.name)
              );
              return [...existing, ...filtered];
            });
          }}
        />
    

      {/* ✅ previews lowercase to match state */}
      {previews.length > 0 && (
        <div className="w-full max-w-2xl mt-6 grid grid-cols-3 gap-4">
          {previews.map((p, i) => (
            <div key={i} className="flex flex-col items-center bg-white rounded-xl shadow p-2">
              <img
                src={p.url}
                alt={p.name}
                className="w-full h-28 object-cover rounded-lg mb-2"
              />
              <p className="text-xs text-slate-600 truncate w-full text-center">{p.name}</p>
              <p className="text-xs text-slate-400">{p.size}</p>
            </div>
          ))}
        </div>
      )}

      <QualitySlider value={quality} onChange={(val) => {
        setQuality(val);
        setIsSuccess(false);
      }} />

      <button
        onClick={handleCompress}
        className="mt-10 bg-green-600 hover:bg-green-700 text-white font-black py-4 px-12 rounded-xl shadow-xl transition-all active:scale-95 text-lg"
      >
        COMPRESS IMAGE
      </button>
      <Reset onReset={handleReset}/>
      <Download />

      <div className={`mt-8 font-mono text-xs uppercase tracking-widest ${
        isSuccess ? 'text-green-600 font-bold' : 'text-slate-400'
      }`}>
        {status}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black text-center mb-10 text-slate-800">
          Why use iLoveIMG Clone?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {features.map((item, index) => (
            <Cards
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
        <Descrip />
        
 

       
      </div>
       <Footer />
    </div>
  );
}

export default App;