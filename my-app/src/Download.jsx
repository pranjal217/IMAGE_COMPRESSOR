import React from 'react'
import callPython from './callPython.js';

const Download = () => {
  return (

    <button onClick={async () => {
  console.log("clicked");
  const result = await callPython(api => api.open_output_folder());
  console.log("result:", result);
}}
    className='mt-8 bg-green-600 border-2 
    border-green-600 text-white
    hover:bg-green-800 font-bold py-5 px-15
    rounded-xl shadow transition-all active:scale-95  text-xl'>
        Open Output Folder

    </button>
  )
}

export default Download