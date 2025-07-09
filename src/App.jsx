import React from 'react'
import Weather from './components/Weather'
import ParticlesBackground from './components/ParticlesBackground'
const App = () => {
  return (
    <div className='app'>
      <ParticlesBackground />
      <Weather/>
    </div>
  )
}

export default App
