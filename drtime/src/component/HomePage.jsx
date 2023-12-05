import { useState, useEffect } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { DateTime } from "luxon";

export default function HomePage({ user }) {
  const [lastAppointment, setLastAppointment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllTermins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/auth/${user._id}`
        );
        const currentDate = Date.now();
        var appointments = response.data;
        var userAppointmentsFromTodayOn = appointments.filter(
          (appointment) =>
            DateTime.fromISO(appointment.appointmentdate) > currentDate
        );
        var usersAppointmentsSorted = userAppointmentsFromTodayOn.sort(
          (a, b) =>
            DateTime.fromISO(a.appointmentdate) -
            DateTime.fromISO(b.appointmentdate)
        );
        setLastAppointment(usersAppointmentsSorted[0]);
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
                    <Link to="/doctors">
                      {" "}
                      <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-2xl text-white">
                        Hausarzt festlegen
                      </button>
                    </Link>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Link to="/doctors">
                      {" "}
                      <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-2xl text-white">
                        Termin vereinbaren
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button className="cursor-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-20 h-20 text-white flex justify-center items-center text-2xl">
                    {" "}
                    <BiPlusMedical />{" "}
                  </button>
                </div>
              </section>
              <div className="flex justify-center pt-8">
                <h1 className="text-5xl text-purple-900 ">
                  {" "}
                  {`Hallo ${user.firstName}`}{" "}
                </h1>
              </div>
              {lastAppointment && (
                <div>
                  <section className="flex justify-center pt-2">
                    <div className="pt-8">
                      <h1 className="text-4xl flex justify-center pb-10 text-purple-900">
                        Ihr nächster Termin
                      </h1>
                      <div className="border-8 border-blue-700 text-blue-700 rounded-3xl flex justify-center items-center w-80 h-32 ">
                        <h1>
                          <span className="flex justify-center">
                            Datum:{" "}
                            {DateTime.fromFormat(
                              lastAppointment.appointmentdate,
                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                            ).toLocaleString({
                              locale: "de-DE",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex justify-center">
                            Zeit:{" "}
                            {DateTime.fromFormat(
                              lastAppointment.appointmentdate,
                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                            ).toLocaleString({
                              locale: "de-DE",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                              timeZone: "Europe/Berlin",
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
            </div>
          )}
        </div>
      )}
    </>
  );
}
