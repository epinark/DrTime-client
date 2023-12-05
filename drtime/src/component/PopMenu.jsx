import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DRTIME from "../assets/images/DRTIME.png";
import { BiMenu } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PopupGfg({ logOut, userId }) {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const doctorId = sessionStorage.getItem("doctorId");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      {isMenuOpen ? (
        <div
          id="sd"
          className="flex h-screen absolute items-center bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 px-2 z-40"
          style={{ top: "0", width: "450px", transform: "translateX(0%)" }}
        >
          <div className="px-2 flex flex-col gap-16">
            <div className="flex absolute top-8 right-60 gap-8">
              <button
                onClick={closeMenu}
                class="material-symbols-outlined text-4xl"
              >
                close
              </button>
            </div>
            <div className="flex justify-center pt-4">
              <Link to="/home">
                {" "}
                <button
                  onClick={closeMenu}
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-60 h-14 text-white hm"
                >
                  Home{" "}
                </button>
              </Link>
            </div>

            <div className="flex justify-center pt-4">
              <Link to="/auth">
                <button
                  onClick={closeMenu}
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-60 h-14 text-white"
                >
                  Profil
                </button>
              </Link>
            </div>
            {doctor && (
              <div className="flex justify-center pt-4">
                <Link to={`/ArtzProfil/${doctorId}`}>
                  {" "}
                  <button
                    onClick={closeMenu}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-60 h-auto text-white"
                  >
                    Hausarzt ändern
                  </button>
                </Link>
              </div>
            )}
            <div className="flex justify-center pt-4">
              <Link to="/MyTermine">
                {" "}
                <button
                  onClick={closeMenu}
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-60 h-14 text-white"
                >
                  Termine
                </button>
              </Link>
            </div>

            <div className="flex justify-center pt-4 pb-4">
              <Link to="/login">
                {" "}
                <button
                  onClick={() => {
                    closeMenu();
                    logOut();
                  }}
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-60 h-14 text-white"
                >
                  Ausloggen
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <button className="absolute inset-y-0 -right-4" onClick={toggleMenu}>
          {" "}
          <BiMenu />{" "}
        </button>
      )}
    </>
  );
}
