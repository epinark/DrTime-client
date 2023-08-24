import React, { useState } from 'react';
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { Link } from "react-router-dom";


export default function Description() {

   
    return (
        <>
        <Header/>
        <div>
            <p>Bitte beschreiben Sie kurz ihr Symptome:</p>
            <input type="text" className='h-5 w-5' />
        </div>
        </>
    )
}