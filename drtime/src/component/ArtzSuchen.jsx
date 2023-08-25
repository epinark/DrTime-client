import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";

const styleLink = document.createElement("link");




export default function ArtzSuchen() {

    const [searchValue, setSearchValue] = useState('');

    return(
        <>
            <div>
                <Header />
            </div>
            <div className=" flex  items-center  flex-col ">
            
            <p className='text-5xl mt-2  text-purple-700'>Artz suchen :</p>
            <SearchBar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <div className='mt-5 docList flex justify-center '>
                <ul className=''>
              
                    <li className='flex items-center space-x-4 mt-5 '>
                       <div className="w-20 h-20"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p className='text-4xl text-purple-700  font-bold '>Dr.Herve du Jardin</p> 
                    </li>
                    <li className='flex items-center space-x-4 mt-5'>
                       <div className="w-20 h-20"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p className='text-4xl text-purple-700  font-bold '>Dr.Herve du Jardin</p> 
                    </li>
                    <li className='flex items-center space-x-4 mt-5'>
                       <div className="w-20 h-20"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p className='text-4xl text-purple-700  font-bold '>Dr.Herve du Jardin</p> 
                    </li>
                    <li className='flex items-center space-x-4 mt-5'>
                       <div className="w-20 h-20"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p className='text-4xl text-purple-700  font-bold '>Dr.Herve du Jardin</p> 
                    </li>
                    <li className='flex items-center space-x-4 mt-5'>
                       <div className="w-20 h-20"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p className='text-4xl text-purple-700  font-bold '>Dr.Herve du Jardin</p> 
                    </li>
                    <li className='flex items-center space-x-4 mt-5'>
                       <div className="w-20 h-20"> <img src={silhouetteProfil} alt="Image Silhouette"   /></div> <p className='text-4xl text-purple-700  font-bold '>Dr.Herve du Jardin</p> 
                    </li>


                    {/* {data.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <li key={index} className='flex items-center space-x-4 mt-5 cursor-pointer'>
                <div className="w-20 h-20"><img src={silhouetteProfil} alt="Image Silhouette" /></div>
                <p>{item.name}</p>
            </li>
        ))} */}
                  
                </ul>
            </div>



            </div>
            
        </>
    )
}