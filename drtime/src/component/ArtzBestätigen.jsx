import { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ArtzBestätigen() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const getOneDoctor = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}`
        );
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    getOneDoctor();
  }, [id]);
  const assignPrimaryDoctor = async () => {
    try {
      const token = localStorage.getItem("token");

      const { id } = useParams();

      await axios.post(
        `${import.meta.env.VITE_APP_DR_TIME}/auth/primaryDoctor`,
        {
          userId: id,
          doctorId: id,
          description: description,
        },
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
          <p className="text-purple-700  font-bold">Als Hausartz festlegen:</p>
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
