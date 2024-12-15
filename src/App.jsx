import { useState , useEffect} from 'react'
import './App.css'
import Radio from './Components/Radio'
import RadioChannel from './Components/RadioChannel'
import Navbar from './Components/Navbar'


function App() {

  return (
    <div>
      <Navbar />
      <RadioChannel />
    </div>
  )
}

export default App
