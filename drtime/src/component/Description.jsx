import React, { useState } from 'react';
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { Link } from "react-router-dom";


export default function Description() {
    const currentDate = new Date();
    const years = Array.from({ length: 10 }, (_, index) => currentDate.getFullYear() - index);
    const months = [
      { value: 0, label: 'January' },
      { value: 1, label: 'February' },
      // ... (continue for all months)
    ];
    const daysInMonth = Array.from({ length: 31 }, (_, index) => index + 1);

    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

    const handleYearChange = (event) => {
      setSelectedYear(parseInt(event.target.value));
    };

    const handleMonthChange = (event) => {
      setSelectedMonth(parseInt(event.target.value));
    };

    const handleDayChange = (event) => {
      setSelectedDay(parseInt(event.target.value));
    };



   
    return (
        <>
        <Header/>
        <div className='flex flex-col items-center mt-5 text-2xl font-bold'>
            <p className=' text-purple-700  font-bold'>Bitte beschreiben Sie 
                kurz ihr Symptome:</p>
            <textarea name="text" id="" cols="50" rows="15"
            className=' resize-none flex bg-white w-80 border border-slate-300  py-2 pl-9  text-xl sm:text-sm mx-auto mt-4
            rounded-md'></textarea>
             <div className="mt-4">
                <p className='text-2xl  text-purple-700  font-bold'>Seit wann?</p>
                <select value={selectedYear} onChange={handleYearChange}>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
                <select value={selectedDay} onChange={handleDayChange}>
                    {daysInMonth.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mt-5 flex '>
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-40 h-20 text-2xl text-white  mb-5 mx-5 ">
              Zurück
            </button>
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-40 h-20 text-2xl text-white  mb-5 mx-5 ">
              Weiter
            </button>
            </div>
        </div>
        
        </>
    )
}