import React from 'react'

function Cards({ title, description, icon }) {
  return (
   
    <div>
    <div className="bg-gradient-to-tr from-green-900 to to-green-400  p-6 rounded-2xl 
     shadow-md border border-slate-200 hover:shadow-xl transition-all group
     hover:-translate-x-2 translate-transition duration-700 h-50">
      
      <div className="text-4xl mb-4 h-12  group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-black shadow-amber-300 text-slate-800 mb-2">{title}</h3>
      <p className="text-black text-sm leading-relaxed mb-4">
        {description}
      </p>
    
    </div>
     
      
  
    </div>
   
  );
}


export default Cards;