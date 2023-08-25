import React, { useState } from 'react';
import Header from "./Header";
import juste from "../assets/images/juste.png";
import { Link } from "react-router-dom";
export default function TermineBestätigung() {

   
    return (
        <>
        <Header/>
        <div className='flex flex-col justify-center items-center mt-40'>
        <img src={juste} alt="Image juste" className="w-40 h-40 bg-" />
        <p className='text-2xl text-purple-700  font-bold '>Sie haben Ihren Termin vereinbaren:</p>
        <p id="terminDatum" className='text-2xl text-purple-700  font-bold '>09.03.2023</p>
        </div>
        </>

    )
    }