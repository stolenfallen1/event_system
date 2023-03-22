import React from 'react'
import dna from '../assets/dna-logo.png'
import '../Styles/main.css'

const Splashscreen = () => {
  return (
    <div className='splash-wrap'>

    <div className="code-loader">
      <span>{'{'}</span>
    </div>

    <div className='p-loader'>DNA MICRO</div>

    <div className="code-loader">
      <span>{'}'}</span>
    </div>

    </div>
  )
}

export default Splashscreen