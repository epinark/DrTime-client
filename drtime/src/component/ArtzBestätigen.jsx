import { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ArtzBestätigen({ userId, doctorId }) {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}`
        );
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    fetchData();
  }, [id]);
  const validateUser = async () => {
    try {
      const response = await axios.get("auth/me");
      const user = response.data;
    } catch (error) {}
  };

  const assignPrimaryDoctor = async () => {
    try {
      const token = localStorage.getItem("token");
      await validateUser(token);
      await axios.post(
        `${import.meta.env.VITE_APP_DR_TIME}/auth/primaryDoctor`,
        { userId, doctorId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      {doctor && (
        <div className="flex items-center flex-col mt-20">
          <p className="text-purple-700 items-center font-bold">
            Als Hausartz festlegen:
          </p>
          <img
            className="flex-column w-40 h-40 mb-8 rounded-full shadow-lg pic"
            src={doctor.profilePhoto}
            alt="Image Silhouette"
          />
          <p className=" text-purple-700 text-lg text-center font-bold mb-40">
            <p>
              {doctor.title}
              {doctor.name}
            </p>
            <p>{doctor.specialization}</p>
            <p>
              {doctor.address.city}, {doctor.address.postalCode}
            </p>
          </p>

          <Link to="/home">
            <button
              onClick={assignPrimaryDoctor}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 shadow-lg"
            >
              Bestätigen
            </button>
          </Link>
          <Link to="/ArtzProfil">
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer shadow-lg">
              Abbrechen
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
