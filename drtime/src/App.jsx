import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Startsite from "./component/Startsite";
import HomePage from './component/HomePage';
import Header from './component/Header';
import Register from './component/Register';
import Login from './component/Login';
import Profil from './component/Profil';
import EditProfil from './component/EditProfil';
import ArtzSuchen from './component/ArtzSuchen';
import ArtzProfil from './component/ArtzProfil';
import MyCalendar from './component/MyCalendar';
import Description from './component/Description';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <div className="bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400  min-h-screen ">
    <Routes> 
      

        
          <Route path="/"  element={<Startsite/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/profil" element={<Profil/>} />
          <Route path="/edit" element={<EditProfil/>} />
          <Route path="/search" element={<ArtzSuchen/>} />
          <Route path="/profilDoc" element={<ArtzProfil/>} />
          <Route path="/MyCalendar" element={<MyCalendar/>} />
          <Route path="/ArtzSuchen" element={<ArtzSuchen/>} />
          <Route path="/ArtzProfil" element={<ArtzProfil/>} />
          <Route path="/Description" element={<Description/>} />


          
   
      
      
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
};

export default App;
