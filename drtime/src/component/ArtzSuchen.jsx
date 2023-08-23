import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";

const styleLink = document.createElement("link");




export default function ArtzSuchen() {
    return(
        <>
            <div>
                <Header />
            </div>
            <div className=" flex  items-center  flex-col ">
            
            <p className='text-5xl'>Artz suchen :</p>
            <SearchBar/>
            <div className='mt-10'>
                <ul>
              
                    <li className='flex items-center space-x-4 mt-5'>
                       <div className="w-10 h-10"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p>Herve du Jardin</p> 
                    </li>
                    <li className='flex items-center space-x-4 mt-5'>
                       <div className="w-10 h-10"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p>Herve du Jardin</p> 
                    </li>
                    <li className='flex items-center space-x-4 mt-5'>
                       <div className="w-10 h-10"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p>Herve du Jardin</p> 
                    </li>
                  
                </ul>
            </div>



            </div>
            
        </>
    )
}