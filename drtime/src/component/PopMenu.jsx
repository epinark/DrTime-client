import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { BiMenu } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PopupGfg({ logOut, userId }) {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const doctorId = sessionStorage.getItem("doctorId");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/${doctorId}`
        );
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    fetchData();
  }, [id]);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div>
      <button onClick={openPopup}>
        {" "}
        <BiMenu />{" "}
      </button>

      <Popup open={isPopupOpen} modal nested closeOnDocumentClick={true}>
        {
          <div id="sd" className="h-auto  bg-cyan-400 px-2">
            <div className="flex flex-col  ">
              <div className="flex justify-center  pt-4">
                <Link to="/home">
                  {" "}
                  <button
                    onClick={closePopup}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-44 h-14 text-white hm"
                  >
                    Home{" "}
                  </button>
                </Link>
              </div>

              <div className="flex justify-center pt-4">
                <Link to="/auth">
                  <button
                    onClick={closePopup}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-44 h-14 text-white"
                  >
                    Profil
                  </button>
                </Link>
              </div>

              <div className="flex justify-center pt-4">
                <Link to={`/ArtzProfil/${doctorId}`}>
                  {" "}
                  <button
                    onClick={closePopup}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-44 h-14 text-white"
                  >
                    Arzt ändern
                  </button>
                </Link>
              </div>
              <div className="flex justify-center pt-4">
                <Link to="/MyTermine">
                  {" "}
                  <button
                    onClick={closePopup}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-44 h-14 text-white"
                  >
                    Termine
                  </button>
                </Link>
              </div>

              <div className="flex justify-center pt-4 pb-4">
                <Link to="/login">
                  {" "}
                  <button
                    onClick={logOut}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-44 h-14 text-white"
                  >
                    Ausloggen
                  </button>
                </Link>
              </div>
            </div>
          </div>
        }
      </Popup>
    </div>
  );
}
