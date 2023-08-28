import React, { useState } from 'react';
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { Link } from "react-router-dom";
export default function ArtzProfil() {

   
    return (
        <>
        
            <div>
                <Header />
            </div>


         <div className=" flex  items-center  flex-col mt-5 ">
           
                <p className="text-5xl font-bold  text-purple-700  ">
                    Artz
                </p>
                <div className="justify-center rounded-full  mb-5  pp"   >
                   
                <img src={silhouetteProfil} alt="Image Silhouette" className="w-40 h-40 pic" />
                <p>Herve du jardin</p>
                <p>doctor</p>
                <p>Spezialität</p>
                <p></p>
                
                
                
                </div>
               
 
             <Link to ="/ArtzSuchen">
             <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5  ">
              Bearbeiten
            </button>
            </Link>
            <Link to='/home'> <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer">
              Zurück
            </button>
            </Link>
            </div>
        </> 
    )

}
