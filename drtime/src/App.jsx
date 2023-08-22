import React from 'react';
import { useState } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Startsite from "./component/Startsite";
import HomePage from './component/HomePage';
import Header from './component/Header';
import Register from './component/Register';
import Login from './component/Login';
import Profil from './component/Profil';
import EditProfil from './component/EditProfil';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    {/* <Router> */}
      {/* <div>
      <Switch> */}

       <div className=" bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 pt-4'> min-h-screen flex justify-center ">
         <Startsite />
       </div>

        <div className='bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 min-h-screen '>
         <Login />
       </div> 

       <div className='bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400  min-h-screen'>
          <Register />
       </div> 

       <div className='bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400  min-h-screen'>
         <HomePage />
       </div>

       <div className='bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400  min-h-screen'>
         <Profil/>
       </div>
       <div className='bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400  min-h-screen'>
         <EditProfil/>
       </div>

{/* <div className="bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 pt-4 min-h-screen flex justify-center">
        <Switch>
          <Route path="/" exact component={Startsite} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={HomePage} />
          <Route path="/profil" component={Profil} />

      </Switch>
      </div>
    </Router> */}
    </>
  );
}

export default App;
