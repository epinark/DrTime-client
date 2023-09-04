import { HeaderBasic } from "./Header";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../utils/authUtils";
import Loading from "./Loading";

const Register = ({
  isAuthenticated,
  setToken,
  setIsAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  const [{ firstName, lastName, email, password, passwordConfirmation, birthDate, telefon, PLZ, city, insuranceNumber }, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    birthDate: "",
    telefon: "",
    PLZ: "",
    city: "",
    insuranceNumber: "",
  });

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!firstName || !lastName || !email || !password || !passwordConfirmation || !birthDate || !telefon || !PLZ || !city || !insuranceNumber)
        throw new Error("Sie müssen alle Felder ausfüllen");

        if (password !== passwordConfirmation) {
          throw new Error("Passwörter stimmen nicht überein");
        }

      setLoadingAuthRequest(true);
      const { data, error } = await registerUser({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
        birthDate,
        telefon,
        PLZ,
        city,
        insuranceNumber,
      });
      if (error) throw error;

      setToken(data.token);
      setIsAuthenticated(true);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
      alert(error.message);
    }
  };
  if (loadingAuthRequest) return <Loading />;
  if (isAuthenticated) return <Navigate to="/auth" />;
  return (
    <>
      <div>
        <HeaderBasic />
      </div>

      <div className="pt-8 flex justify-center scrollRegisterLogin  ">
        <div className="flex justify-center flex-col">
          <form action="get" onSubmit={handleSubmit}>
            <div id="my Form">
              <div id="anrede" className="mb-6">
                <h1 className="text-xl font-bold mb-4 flex justify-center  text-purple-700">
                  Anrede
                </h1>

                <div className="flex justify-evenly">
                  <div className="flex">
                    <label
                      htmlFor="Herr"
                      className="font-bold mb-2 text-purple-700  "
                    >
                      Herr
                    </label>
                    <input
                      type="radio"
                      name="anrede"
                      id="gender"
                      className="mx-2 w-5 h-5"
                    />
                  </div>
                  <div className="flex">
                    <label
                      htmlFor="Frau"
                      className=" font-bold mb-2  text-purple-700"
                    >
                      Frau
                    </label>
                    <input
                      type="radio"
                      name="anrede"
                      id="gender"
                      className="mx-2 w-5 h-5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="vorname"
                    className="text-xl font-bold mb-2  text-purple-700"
                  >
                    Vorname
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="placeholder-italic placeholder-slate-400 block bg-white w-32 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mr-8"
                    placeholder="Vorname"
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col ">
                  <label
                    htmlFor="nachname"
                    className="text-xl font-bold mb-2  text-purple-700"
                  >
                    Nachname
                  </label>
                  <input
                    id="lastName"
                    type="name"
                    className="placeholder-italic placeholder-slate-400 block bg-white w-32 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto"
                    placeholder="Nachnahme"
                    value={lastName}
                    onChange={handleChange}
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
                  placeholder="Email addresse"
                  value={email}
                  onChange={handleChange}
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
                  minLength={8}
                  required
                  className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mt-2"
                  placeholder="Ihr Password hier..."
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="t text-xl font-bold  text-purple-700"
                >
                  Password wiederholen:
                </label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={handleChange}
                  id="passwordConfirmation"
                  minLength={8}
                  required
                  className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"
                  placeholder="Ihr Password wieder hier..."
                />
              </div>
              {password && password !== passwordConfirmation && (
              <p className="text-purple-700">Passwörter stimmen nicht überein.</p>)}

              <div className="flex justify-between items-center mt-7">
                <label
                  htmlFor="birthDate"
                  className=" text-xl font-bold  text-purple-700 "
                >
                  Geburstdatum
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={birthDate}
                  onChange={handleChange}
                  className="placeholder-italic placeholder-slate-400 block bg-white w-40 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto "
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="Handynummer"
                  className=" text-xl font-bold  text-purple-700"
                >
                  Handynummer
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={telefon}
                  onChange={handleChange}
                  className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"
                />
              </div>

              <div id="anrede" className="mb-6 mt-6">
                <h1 className="text-xl font-bold mb-4 flex justify-center  text-purple-700">
                  Adresse
                </h1>

                <div className="flex justify-evenly ">
                  <div className="flex items-center">
                    <label
                      htmlFor="PLZ"
                      className="font-bold mr-2  text-purple-700"
                    >
                      PLZ
                    </label>
                    <input
                      type="number"
                      name="PLZ"
                      id="PLZ"
                      value={PLZ}
                      onChange={handleChange}
                      className="placeholder-italic placeholder-slate-400 block bg-white w-24 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mr-2"
                      placeholder="35683"
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="City"
                      className=" font-bold mr-2  text-purple-700"
                    >
                      Ort
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={handleChange}
                      className="placeholder-italic placeholder-slate-400 block bg-white w-28 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto"
                      placeholder="Dillenburg"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="insuranceNumber"
                  className=" text-xl font-bold  text-purple-700 "
                >
                  KV-Nummer
                </label>
                <input
                  type="text"
                  id="insuranceNumber"
                  name="insuranceNumber"
                  value={insuranceNumber}
                  onChange={handleChange}
                  className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"
                />
              </div>

              <div className="flex justify-center pt-10 pb-10">
                <button
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white"
                  type="submit"
                >
                  Anmelden
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
