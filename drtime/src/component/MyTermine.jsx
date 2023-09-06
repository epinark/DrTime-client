import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import PopupGfg from "./PopMenu";

export default function MyTermine({ user }) {
  // const { id } = useParams();

  const [termins, setTermins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllTermins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/auth/${user._id}`
        );
        setTermins(response.data);
        setLoading(false);
      } catch (error) {
        setError("Fetch problem");
        console.error(error);
      }
    };

    if (user && user._id) {
      getAllTermins();
    }
  }, [user]);

  return (
    <>
      {user && user._id && (
        <div>
          <div
            id="Hier die termine"
            className="flex flex-col items-center justify-center mt-10"
          >
            <div>
              <h1 className="text-4xl text-purple-700  font-bold ">Termine</h1>
            </div>
            <div
              id="Weisse platz"
              className="rounded-xl  min-h-screen  TerminList"
            >
              {loading ? (
                <Loading />
              ) : (
                <div className="flex flex-col justify-center">
                  {termins.length > 0 ? (
                    termins.map((termin, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 w-56 h-36
                    rounded-xl flex justify-center items-center flex-col text-white font-bold  m-3"
                      >
                        {/* <span className="mb-4 text-2xl">Arzt</span> */}
                        <span className="mb-4 text-2xl"> {termin.doctor.name}</span>
                        <span className="text-xl">
                          Date:{" "}
                          {new Date(termin.appointmentdate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </span>
                        <span className="text-xl mt-2">
                          {" "}
                          {new Date(termin.appointmentdate).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )} Uhr
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>Du hast noch keinen Termin </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* {error && <p>{error}</p>}
      <PopupGfg userId={user && user._id} /> */}
    </>
  );
}
