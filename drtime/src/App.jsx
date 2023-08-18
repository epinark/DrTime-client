import { useState } from 'react'
import Startsite from "./component/Startsite";
import HomePage from './component/HomePage';
import Header from './component/Header';
import Register from './component/Register';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Header />
    </div>


    {/* <div className="lassName='  bg-blue-200 pt-4'> min-h-screen flex justify-center ">
      <Startsite />
    </div> */}

    <div>
      <HomePage />
    </div>

    {/* <div>
      <Register />
    </div> */}

    </>
  )
}

export default App
