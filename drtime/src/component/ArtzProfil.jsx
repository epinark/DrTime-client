import React, { useState, useEffect } from "react";
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ArtzBestätigen({ user }) {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [updatedDoctor, setUpdatedDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}`
        );
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    fetchData();
  }, [id]);

  const updatePrimaryDoctor = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_DR_TIME}/auth/primaryDoctor`,
        { doctorId: id, userId: user._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUpdatedDoctor(response.data);
    } catch (error) {
      console.error("Assignment failed", error);
    }
  };
  return (
    <>
      {doctor && (
        <div className=" flex  items-center  flex-col mt-5 ">
          <p className="text-5xl font-bold  text-purple-700  ">Arzt</p>
          <div className="justify-center rounded-full  mb-5  pp">
            <img
              src={doctor.profilePhoto}
              alt="Image Silhouette"
              className="flex-column w-40 h-40 mb-8  text-purple-700 rounded-full shadow-lg pic"
            />
            <p className=" text-purple-700 text-lg text-center font-bold mb-40">
              <p>{doctor.name}</p>
              <p>{doctor.title}</p>
              <p>{doctor.specialization}</p>
              <p>{doctor.address.city}</p>
              <div>
                <p>Available Hours:</p>
                <ul>
                  {doctor.availability[0].hours.map((hour, hourIndex) => (
                    <li key={hourIndex}>{hour}</li>
                  ))}
                </ul>
              </div>
            </p>
          </div>

          <Link to="/ArtzSuchen">
            <button
              onClick={updatePrimaryDoctor}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 shadow-lg "
            >
              Bearbeiten
            </button>
          </Link>
          <Link to="/home">
            {" "}
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer shadow-lg">
              Zurück
            </button>
          </Link>
        </div>
      )}
      ;
    </>
  );
}
