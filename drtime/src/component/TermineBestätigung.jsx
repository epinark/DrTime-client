import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import juste from "../assets/images/juste.png";
import { Link } from "react-router-dom";
export default function TermineBestätigung() {
  const [lastAppointment, setLastAppointment] = useState([]);
  useEffect(() => {
    const getAllTermins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/appointments/`
        );

        setLastAppointment(response.data[response.data.length - 1]);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTermins();
  }, []);
  
  return (
    <> 
  
    
      <div className="flex flex-col justify-center items-center mt-40">
        <div className="bg-white rounded-full w-64 h-64 flex justify-center items-center">
        <img src={juste} alt="Image juste" className="w-40 h-40 " />
        </div>
        <div className="mt-10">
        <p className="text-2xl text-purple-700  font-bold ">
          Sie haben Ihren Termin vereinbart:
        </p>
        </div>
        <div id="terminDatum" className="text-4xl text-purple-700  font-bold  flex flex-col justify-center items-center mt-10 ">
            <span>
                      
              {new Date(
              lastAppointment.appointmentdate
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
            <span className="mt-5 ">
                      
              {new Date(
              lastAppointment.appointmentdate
              ).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,})}
              Uhr</span>

        </div>
        

        <Link to="/home">
          <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto cursor-pointer mt-20">
            Weiter
          </button>
        </Link>
      </div>
  
    </>
  );
}

// Hello world