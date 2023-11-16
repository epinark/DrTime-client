import Calendar from "react-calendar";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";

function AvailableHours({
  selectedDate,
  handleCitaSeleccionada,
  user,
  doctor,
  existingAppointments,
}) {
  const [availableHours, setAvailableHours] = useState([]);

  useEffect(() => {
    const formattedDate =
      selectedDate instanceof DateTime
        ? selectedDate.toFormat("yyyy-MM-dd")
        : "";

    // Fetch existing appointments for the selected date
    const fetchExistingAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/apps/${
            doctor._id
          }/${formattedDate}`
        );
        const bookedTimes = response.data
          .map((appointment) => {
            const parsedDateTime = DateTime.fromFormat(
              appointment.appointmenttime
            ).toLocaleString();
          })
          .filter((time) => time !== null);

        setAvailableHours(bookedTimes);
      } catch (error) {
        console.error("Error fetching existing appointments:", error);
      }
    };

    if (selectedDate && doctor) {
      fetchExistingAppointments();
    }
  }, [selectedDate, doctor]);

  const handleCitaClick = (hour) => {
    const termin = {
      date: selectedDate.toDateString(),
      hour: hour,
    };
    handleCitaSeleccionada(termin);
  };

  return (
    <div className="">
      {selectedDate && user && (
        <div>
          {/* <div className="">
            <h1 className="flex justify-center text-2xl text-purple-700 font-bold mb-4">
              Verfügbarkeit {selectedDate.toDateString()}
            </h1>
          </div> */}
          <div className="grid grid-cols-2">
            {availableHours.map((hour, hourIndex) => (
              <button
                key={hourIndex}
                onClick={() => handleCitaClick(hour)}
                className="bg-gradient-to-r from-blue-300 via-blue-300 to-blue-300
                rounded-full flex justify-center items-center text-white font-bold text-xl w-40 h-14 m-3"
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyCalendar({ user }) {
  const { id } = useParams();

  const [appointmentDate, setAppointmentDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [citasSeleccionadas, setCitasSeleccionadas] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}`
        );
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCitaSeleccionada = (termin) => {
    setCitasSeleccionadas([...citasSeleccionadas, termin]);
  };

  const [selectedTime, setSelectedTime] = useState(null);

  // Define the start and end times
  const startTime = 9;
  const endTime = 16;

  // Create an array of time slots
  const timeSlots = [];
  for (let hour = startTime; hour <= endTime; hour++) {
    timeSlots.push(`${hour}:00`);
    timeSlots.push(`${hour}:30`);
  }

  const handleSelectedTime = (time) => {
    setSelectedTime(time);
  };

  const handleTerminCreation = async () => {
    try {
      const formattedDate =
        DateTime.fromJSDate(selectedDate).toFormat("yyyy-MM-dd");
      const formattedTime = DateTime.fromFormat(selectedTime, "HH:mm").toFormat(
        "HH:mm"
      );

      const response = await axios.post(
        `${import.meta.env.VITE_APP_DR_TIME}/appointments/`,
        {
          user: user._id,
          doctor: id,
          appointmentdate: formattedDate,
          appointmenttime: formattedTime,
          description: "test4",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAppointmentDate(response.data);
      sessionStorage.setItem("appointmentId", id);
    } catch (error) {
      console.error("Appointment failed", error);
    }
  };

  return (
    <div>
      {doctor && (
        <div className="scroll calendarStyle h-fit">
          <div className="  flex flex-col items-center justify-center mt-5">
            <div className="mb-8">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                selectRange={false}
                tileContent={({ date, view }) => {
                  if (
                    view === "month" &&
                    date.toDateString() === selectedDate?.toDateString()
                  ) {
                    return <div className="selected-day "></div>;
                  }
                }}
                formatShortWeekday={(locale, date) =>
                  date.toLocaleDateString(locale, { weekday: "short" })
                }
                formatMonthYear={(locale, date) => {
                  const options = { month: "long", year: "numeric" };
                  return date.toLocaleDateString(locale, options);
                }}
                prevLabel={
                  <span className="text-3xl text-purple-700 rounded-md bg-blue-200 p-1">
                    &lt;
                  </span>
                }
                nextLabel={
                  <span className="text-3xl text-purple-700 bg-blue-200 p-1 rounded-md ">
                    &gt;
                  </span>
                }
              />
            </div>

            <div>
              <AvailableHours
                selectedDate={selectedDate}
                handleCitaSeleccionada={handleCitaSeleccionada}
                user={user}
                doctor={doctor}
              />
            </div>
            {selectedDate && (
              <div
                className="grid grid-cols-3 "
                //
              >
                {doctor.availability[0].hours.map((hour, hourIndex) => (
                  <button
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-24 h-12 text-xl text-white m-2 active:bg-violet-700 focus:outline-xl focus:ring focus:ring-violet-700"
                    onClick={() => handleSelectedTime(hour)}
                    key={hourIndex}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-around mt-40">
            <Link to="/ArtzSuchen">
              <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-40 h-16 text-3xl text-white">
                Zurück
              </button>
            </Link>
            <Link to={`/description/${id}`}>
              {" "}
              <button
                onClick={() => handleTerminCreation()}
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-40 h-16 text-3xl text-white"
              >
                Weiter
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
