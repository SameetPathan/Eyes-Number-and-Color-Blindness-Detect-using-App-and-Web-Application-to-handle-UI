import React from 'react'
import '../Background.css'

function BackgroundC() {
  return (
    <div className="background-container">
      <img
      style={{ 
          width: '100%', 
          height:"730px",
          objectFit: 'cover' 
        }} 
        src="bg2.jpg"
        alt="Background Image"
        className="background-image"
      />
      <div className="text-overlay">
       
<h1 style={{fontWeight:"bold",fontSize:"50px"}}>Eyes On: Tailored Website Experience</h1>
      </div>
    </div>
  )
}

export default BackgroundC