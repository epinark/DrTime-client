import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";

export default function EditProfil() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className=" flex justify-center items-center  flex-col  scrollRegisterLogin ">
        <p className="text-5xl font-bold mb-5  text-purple-700 ">
          Daten ändern:
        </p>
        <form action="get" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-xl font-bold mb-2  text-purple-700 "
              >
                Vorname
              </label>
              <input
                type="text"
                className="placeholder-italic placeholder-slate-400 block bg-white w-32 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mr-8"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col ">
              <label
                htmlFor=""
                className="text-xl font-bold mb-2  text-purple-700 "
              >
                Nachname
              </label>
              <input
                type="name"
                className="placeholder-italic placeholder-slate-400 block bg-white w-32 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-xl font-bold  text-purple-700 "
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="placeholder-italic placeholder-slate-400 block w-80 border  rounded-full py-2 pl-9 sm:text-sm mt-2"
              placeholder="Ihre Email hier"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="t text-xl font-bold  text-purple-700"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"
              placeholder="Ihr Password wieder hier..."
            />
          </div>

          <div className="flex justify-between items-center mt-7">
            <label htmlFor="" className=" text-xl font-bold  text-purple-700 ">
              Geburstdatum
            </label>
            <input
              type="date"
              className="placeholder-italic placeholder-slate-400 block bg-white w-40 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto "
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className=" text-xl font-bold  text-purple-700 ">
              Handynummer
            </label>
            <input
              type="tel"
              name="telefon"
              id="telefon"
              className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"
              value={formData.telefon}
              onChange={handleInputChange}
            />
          </div>

          <div id="anrede" className="mb-6 mt-6">
            <h1 className="text-xl font-bold mb-4 flex justify-center  text-purple-700 ">
              Adresse
            </h1>

            <div className="flex justify-evenly ">
              <div className="flex items-center">
                <label
                  htmlFor="PLZ"
                  className="font-bold mr-2  text-purple-700  "
                >
                  PLZ
                </label>
                <input
                  type="number"
                  name="plz"
                  id="plz"
                  className="placeholder-italic placeholder-slate-400 block bg-white w-24 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mr-2"
                  placeholder="35683"
                  value={formData.PLZ}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="Ort"
                  className=" font-bold mr-2  text-purple-700 "
                >
                  Ort
                </label>
                <input
                  type="text"
                  name="ort"
                  id="ort"
                  className="placeholder-italic placeholder-slate-400 block bg-white w-28 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto"
                  placeholder="Dillenburg"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="" className=" text-xl font-bold  text-purple-700 ">
              KV-Nummer
            </label>
            <input
              type="text"
              className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"
              value={formData.insuranceNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center items-center flex-col mt-3">
            <Link to="/profil">
              {" "}
              <button
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer  "
                type="submit"
              >
                Speichern
              </button>
            </Link>
            <Link to="/profil">
              <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer ">
                Abbrechen
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
