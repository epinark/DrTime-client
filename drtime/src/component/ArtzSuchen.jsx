import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Header from "./Header";
import axios from "axios";
import autoprefixer from "autoprefixer";
const styleLink = document.createElement("link");

export default function ArtzSuchen({}) {
  const [searchValue, setSearchValue] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/`
        );
        setDoctors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllDoctors();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className=" flex  items-center  flex-col ">
        <p className="text-5xl mt-2  text-purple-700">Arzt suchen :</p>
        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="mt-5 docList flex justify-center ">
          <ul className="">
            {doctors.map((doctor, index) => (
              <Link to={`/doctors/${doctor._id}`} key={index}>
                <li className="flex items-center space-x-4 mt-8 ">
                  <div className="w-22 h-20">
                    <img
                      className="w-20 h-20 rounded-full shadow-lg"
                      src={doctor.profilePhoto}
                      alt="Image Silhouette"
                    />
                  </div>
                  <p className="text-4xl text-purple-700  font-bold ">
                    {doctor.title}
                    {doctor.name}
                  </p>
                </li>
              </Link>
            ))}

            {/* {data.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <li key={index} className='flex items-center space-x-4 mt-5 cursor-pointer'>
                <div className="w-20 h-20"><img src={silhouetteProfil} alt="Image Silhouette" /></div>
                <p>{item.name}</p>
            </li>
        ))} */}
          </ul>
          <button>Logout</button>
        </div>
      </div>
    </>
  );
}
