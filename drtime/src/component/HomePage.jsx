import { useState, useEffect } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default function HomePage( { user } ) {
  const [lastAppointment, setLastAppointment] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllTermins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/auth/${user._id}`
        );
        setLastAppointment(response.data[response.data.length - 1]);
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
          {loading ? (
            <Loading />
          ) : (
            <div className="pt-4">
              <section id="my buttons für arzt termin">
                <div className="flex flex-col  ">
                  <div className="flex justify-center pt-4">
                    {/* ArtzSuchen wenn kein Profil und Beschreibung wenn es ein Profil gibt */}

                    <Link to="/doctors">
                      {" "}
                      <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white">
                      Neuer Termin
                      </button>
                    </Link>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white">
                      Kinderarzt
                    </button>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-20 h-20 text-white flex justify-center items-center text-2xl">
                    {" "}
                    <BiPlusMedical />{" "}
                  </button>
                </div>
              </section>
              <div className="flex justify-center pt-8">
                <h1 className="text-5xl"> {`Hallo ${user.firstName}`} </h1>
              </div>
              {lastAppointment && (
                <div>
                  <section className="flex justify-center pt-2">
                    <div className="pt-8">
                      <h1 className="text-4xl flex justify-center pb-10">
                        Ihr nächster Termin
                      </h1>
                      <div className="border-8 border-blue-700 text-blue-700 rounded-3xl flex justify-center items-center w-80 h-32 ">
                        <h1>
                          {/* {" "}
                    Datum{} {lastAppointment}, Uhr{}{" "} */}
                          <span className="flex justify-center">
                            Datum:{" "}
                            {new Date(
                              lastAppointment.appointmentdate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>{" "}
                          <span className="flex justify-center">
                            Zeit:{" "}
                            {new Date(
                              lastAppointment.appointmentdate
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </section>
                  <div id="termine" className="flex justify-center pt-16 ">
                    <Link to="/MyTermine">
                      {" "}
                      <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white">
                        Termine
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              ;
            </div>
          )}
        </div>
      )} 
    </>
  );
}
