import React, { useState } from "react";

import juste from "../assets/images/juste.png";
import { Link } from "react-router-dom";
export default function TermineBestätigung() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-40">
        <img src={juste} alt="Image juste" className="w-40 h-40 bg-" />
        <p className="text-2xl text-purple-700  font-bold ">
          Sie haben Ihren Termin vereinbart:
        </p>
        <p id="terminDatum" className="text-2xl text-purple-700  font-bold ">
          09.03.2023
        </p>

        <Link to="/home">
          <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto cursor-pointer">
            Weiter
          </button>
        </Link>
      </div>
    </>
  );
}
