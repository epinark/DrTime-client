import { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { useParams } from "react-router-dom";
import PopupGfg from "./PopMenu";
import axios from "axios";
import Loading from "./Loading"; // Loading bileşenini içe aktarın

export default function ArtzBestätigen({ user }) {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumunu izlemek için bir state ekleyin

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}`
        );
        setDoctor(response.data);
        setIsLoading(false); // Veri yüklendikten sonra yükleme durumunu güncelleyin
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setIsLoading(false); // Hata durumunda yükleme durumunu güncelleyin
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
      {isLoading ? ( // Yükleme durumuna göre Loading bileşenini veya içeriği gösterin
        <Loading />
      ) : (
        doctor && (
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
        )
      )}
    </>
  );
}
