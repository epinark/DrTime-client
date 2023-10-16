import { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { useParams } from "react-router-dom";
import PopupGfg from "./PopMenu";
import axios from "axios";
import Loading from "./Loading";

export default function ArtzBestätigen({ user }) {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}`
        );
        setDoctor(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const assignPrimaryDoctor = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_DR_TIME}/auth/primaryDoctor`,
        { doctorId: id, userId: user._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      sessionStorage.setItem("doctorId", id);
    } catch (error) {
      console.error("Assignment failed", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        doctor && (
          <div className="flex items-center flex-col mt-5">
            <p className="text-purple-700 items-center font-bold">
              Als Hausartz festlegen:
            </p>
            <img
              className="flex-column w-64 h-60 mb-8 rounded-full shadow-lg object-cover pic"
              src={doctor.profilePhoto}
              alt="Image Silhouette"
            />
            <div className=" text-purple-700 text-lg text-center font-bold mb-28">
              <h1 className="text-5xl">
                {doctor.title}
                {doctor.name}
              </h1>
              <h1 className="text-4xl">{doctor.specialization}</h1>
              <h1 className=" text-3xl">
                {doctor.address.city}, {doctor.address.postalCode}
              </h1>
            </div>
            <div className="flex flex-col ">
              <Link to={`/MyCalendar/${doctor._id}`}>
                <button
                  onClick={assignPrimaryDoctor}
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 shadow-lg"
                >
                  Bestätigen
                </button>
              </Link>
              <Link to="/ArtzSuchen">
                <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer shadow-lg">
                  Abbrechen
                </button>
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
}
