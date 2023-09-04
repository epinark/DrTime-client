import Calendar from "react-calendar";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
// import MyTermine from './MyTermine'; // Importa MyTermine
import { useParams } from "react-router-dom";
import axios from "axios";

function AvailableHours({ selectedDate, handleCitaSeleccionada }) {
  const [availableHours, setAvailableHours] = useState([]);

  // Función para cargar las horas disponibles basadas en la date seleccionada
  const loadAvailableHours = () => {
    // Aquí llamada a backend para obtener las horas disponibles
    // Por ahora ejemplo estático
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_DR_TIME}/doctors/${id}`
          );
          setDoctor(response.data);
        } catch (error) {
          console.error("Error fetching doctor:", error);
        }
      };
      fetchData();
    }, [id]);
    {
      doctor.timings.startTime;
    }

    const exampleAvailableHours = [
      "09:00",
      "09:30",
      "09:50",
      "10:00",
      "10:25",
      "10:40",
      "11:00",
      "11:20",
      "11:40",
      "14:00",
    ];
    setAvailableHours(exampleAvailableHours);
  };

  // Cargar las horas disponibles cuando la date seleccionada cambie
  React.useEffect(() => {
    if (selectedDate) {
      loadAvailableHours();
    }
  }, [selectedDate]);

  // Función para manejar la selección de una termin
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
              {" "}
              Verfügbarkeit {selectedDate.toDateString()}
            </h1>
          </div>
          <div className="grid grid-cols-2">
            {availableHours.map((hour, index) => (
              <button
                key={index}
                onClick={() => handleCitaClick(hour)} // Manejar la selección de la termin
                className="bg-gradient-to-r from-blue-300 via-blue-300 to-blue-300
                rounded-full flex justify-center items-center text-white font-bold text-xl w-40 h-14 m-3"
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [citasSeleccionadas, setCitasSeleccionadas] = useState([]); // Estado para almacenar citas seleccionadas

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Función para manejar la selección de una termin
  const handleCitaSeleccionada = (termin) => {
    setCitasSeleccionadas([...citasSeleccionadas, termin]);
  };

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
      {/* Pasa las citas seleccionadas a MyTermine */}
      {/* <MyTermine citasSeleccionadas={citasSeleccionadas} /> */}
    </div>
  );
}
