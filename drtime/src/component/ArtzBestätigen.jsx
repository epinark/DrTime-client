import React, { useState } from 'react';
import Header from "./Header";
import { Link } from "react-router-dom";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";



export default function ArtzBestätigen() {

    return (
        <>
        <Header/>
        <div className=" flex  items-center  flex-col mt-5 ">
            <p>Als Hausartz festlegen:</p>
            <img src={silhouetteProfil} alt="Image Silhouette" className="w-40 h-40 pic" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam ab quisquam perspiciatis quo 
                sed exercitationem delectus earum qui nemo tempora? Impedit doloremque cumque architecto modi 
                reprehenderit praesentium repudiandae labore dolores molestias? Accusamus, mollitia animi!
            </p>
           <Link to ='/home'> <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5  ">
              Bestätigen
            </button>
            </Link>
            <Link to='/'> <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer">
              Abbrechen
            </button>
            </Link>
        </div>
        </>
        
    )
}