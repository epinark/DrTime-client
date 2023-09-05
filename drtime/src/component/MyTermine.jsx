import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
export default function MyTermine({}) {
  // export default function MyTermine({ citasSeleccionadas }) {

  // fix for the termine

  // const citasSeleccionadas = {};

  // MyTermine.propTypes = {
  //   citasSeleccionadas: PropTypes.array.isRequired, // Define la validación para citasSeleccionadas
  // };

  const [termins, setTermins] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllTermins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/appointments/`
        );
        setTermins(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTermins();
  }, []);

  return (
    <>
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
            className="bg-white rounded-xl w-40 m-5 TerminList"
          >
            {loading ? (
              <Loading /> // Veriler yüklenirken loading bileşenini göster
            ) : (
              <div className="flex flex-col justify-center">
                {termins.length > 0 ? (
                  termins.map((termin, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 
                    rounded-xl flex justify-center items-center flex-col text-white font-bold  m-3"
                    >
                      <span className="mb-4 text-xl">HausArzt</span>
                      <span>
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
                      <span>
                        Time:{" "}
                        {new Date(termin.appointmentdate).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
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
    </>
  );
}
