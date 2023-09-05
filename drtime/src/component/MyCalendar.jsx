import Calendar from "react-calendar";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function AvailableHours({ selectedDate, handleCitaSeleccionada }, { user }) {
  const [availableHours, setAvailableHours] = useState([]);
  const [doctor, setDoctor] = useState(null);

  // Función para cargar las horas disponibles basadas en la fecha seleccionada
  const loadAvailableHours = async () => {
    try {
      const { id } = useParams();
      const response = await axios.get(
        `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}`
      );
      setDoctor(response.data);

      // Aquí deberías obtener los horarios disponibles del doctor desde el backend
      const availableHoursResponse = await axios.get(
        `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}/available-hours`
      );
      setAvailableHours(availableHoursResponse.data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  // Cargar las horas disponibles cuando la fecha seleccionada cambie
  useEffect(() => {
    if (selectedDate) {
      loadAvailableHours();
    }
  }, [selectedDate]);

  // Función para manejar la selección de una cita
  const handleCitaClick = (hour) => {
    const termin = {
      date: selectedDate.toDateString(),
      hour: hour,
    };
    handleCitaSeleccionada(termin);
  };

  return (
    <div className="">
      {selectedDate && doctor && (
        <div>
          <div className="">
            <h1 className="flex justify-center text-2xl text-purple-700 font-bold mb-4">
              Verfügbarkeit {selectedDate.toDateString()}
            </h1>
          </div>
          <div className="grid grid-cols-2">
            {availableHours.map((hour, index) => (
              <button
                key={index}
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

export default function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [citasSeleccionadas, setCitasSeleccionadas] = useState([]);
  const [nextDayHours, setNextDayHours] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCitaSeleccionada = (termin) => {
    setCitasSeleccionadas([...citasSeleccionadas, termin]);
  };

  // Función para obtener las horas del siguiente día
  const getNextDayHours = async () => {
    try {
      const { id } = useParams();
      const tomorrow = new Date(selectedDate);
      tomorrow.setDate(selectedDate.getDate() + 1);

      const response = await axios.get(
        `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}/available-hours`,
        {
          params: {
            date: tomorrow.toISOString(), // Envía la fecha del siguiente día
          },
        }
      );

      setNextDayHours(response.data);
    } catch (error) {
      console.error("Error fetching next day hours:", error);
    }
  };

  // Cargar las horas del siguiente día cuando la fecha seleccionada cambie
  useEffect(() => {
    if (selectedDate) {
      getNextDayHours();
    }
  }, [selectedDate]);

  return (
    <div>
      <div className="scroll calendarStyle">
        <div className="  flex flex-col items-center justify-center mt-10">
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
            />
          </div>
        </div>
        <div className="flex justify-around mt-5">
          <Link to="/home">
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-40 h-20 text-3xl text-white">
              Zurück
            </button>
          </Link>
          <Link to="/description">
            {" "}
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-40 h-20 text-3xl text-white">
              Weiter
            </button>
          </Link>
        </div>
      </div>
      {/* Mostrar las horas del siguiente día */}
      {nextDayHours.length > 0 && (
        <div>
          <h2 className="text-2xl text-purple-700 font-bold mt-5">
            Verfügbarkeit am nächsten Tag
          </h2>
          <div className="grid grid-cols-2">
            {nextDayHours.map((hour, index) => (
              <button
                key={index}
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
