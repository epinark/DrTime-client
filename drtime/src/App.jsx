import { useState } from 'react'
import Startsite from "./component/Startsite";
import HomePage from './component/HomePage';
import Header from './component/Header';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Header />
    </div>


    {/* <div className="bg-cyan-400 min-h-screen flex justify-center ">
      <Startsite />
    </div> */}

    {/* <div>
      <HomePage />
    </div> */}

    </>
  )
}

export default App
