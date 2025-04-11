import React from 'react'
import AtomicSpinner from 'atomic-spinner'


export default function Loader () {
  return (
    <div className="flex flex-col items-center justify-center ">
      <AtomicSpinner displayElectronPaths="true" displayNucleus="true" nucleusParticleFillColor="#00FFFF"  electronPathColor='#E0FFFF' atomSize={500}/>
      <h1 className='font-bold text-2xl font-stretch-extra-expanded'>NEBULA OTT</h1>    
    </div>
  )
}
