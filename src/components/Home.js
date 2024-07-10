import React from 'react'

export default function Home() {
  
  return (
    <div className="container">
      <div className="text-center">
        <img src={require('../images/notes.png')} alt="" className='rounded' width={800} />
      </div>
      <h3 className="text-center my-4">This is your OneStop online Notes App</h3>
    </div>
  )
}
