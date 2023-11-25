import Calendar from "react-calendar";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";

function AvailableHours({ selectedDate, user, doctor, handleSelectedTime }) {
  const [availableHours, setAvailableHours] = useState([]);
  const [bookedHours, setBookedHours] = useState([]);

  useEffect(() => {
    const parsedDate = DateTime.fromJSDate(new Date(selectedDate));

    const formattedDate = parsedDate.toFormat("yyyy-MM-dd");

    const dayName = parsedDate.toFormat("cccc");

    var doctorsAppointments = doctor.availability.find(
      (day) => day.weekDay === dayName
    );

    const fetchExistingAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_DR_TIME}/doctors/apps/${
            doctor._id
          }/${formattedDate}`
        );
        const bookedHours = response.data
          .map((appointment) => {
            const dateTime = DateTime.fromISO(appointment.appointmentdate, {
              zone: "UTC",
            });
            return dateTime.toFormat("HH:mm");
          })
          .filter((time) => time !== null);

        setBookedHours(bookedHours);
        if (doctorsAppointments) {
          setAvailableHours(doctorsAppointments.hours);
        }
      } catch (error) {
        console.error("Error fetching existing appointments:", error);
      }
    };

    if (selectedDate && doctor) {
      fetchExistingAppointments();
    }
  }, [selectedDate, doctor]);

  return (
    <div className="">
      {selectedDate && user && (
        <div>
          <div className="appointments grid grid-cols-3">
            {selectedDate &&
              availableHours.map((hour, hourIndex) => (
                <button
                  key={hourIndex}
                  onClick={() => handleSelectedTime(hour)}
                  className={`${
                    bookedHours.includes(hour) ? "disabled:opacity-50" : ""
                  } bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-24 h-12 text-xl text-white m-2 active:bg-violet-700 focus:outline-xl focus:ring focus:ring-violet-700`}
                  disabled={bookedHours.includes(hour)}
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
  const [selectedAppointments, setSelectedAppointments] = useState([]);
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

  const handleSelectedAppointment = (appointment) => {
    setSelectedAppointments([...selectedAppointments, appointment]);
  };

  const [selectedTime, setSelectedTime] = useState(null);

  const handleSelectedTime = (time) => {
    setSelectedTime(time);
  };

  const handleAppointmentCreation = async () => {
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
                handleSelectedAppointment={handleSelectedAppointment}
                user={user}
                doctor={doctor}
                handleSelectedTime={handleSelectedTime}
              />
            </div>
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
                onClick={() => handleAppointmentCreation()}
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
