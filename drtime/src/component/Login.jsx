import { Link } from "react-router-dom";
import DRTIME from "../assets/images/DRTIME.png";
import { loginUser } from "../utils/authUtils";
import { Navigate } from "react-router-dom";

import Loading from "./Loading";
import { useState } from "react";
const Login = ({
  isAuthenticated,
  setToken,
  setIsAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  const [{ email, password }, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password)
        throw new Error("Email and password are required");
      setLoadingAuthRequest(true);
      const { data, error } = await loginUser({ email, password });
      if (error) throw error;
      setToken(data.token);
      setIsAuthenticated(true);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
      console.error(error.message);
    }
  };
  if (loadingAuthRequest) return <Loading />;
  if (isAuthenticated) return <Navigate to="/auth" />;
  return (
    <>
      <div className="flex justify-center flex-col">
        <div className="flex justify-center items-center h-96 ">
          <img src={DRTIME} alt="logo" className="w-80" />
        </div>

        <div className="flex flex-col justify-center">
          <form
            action=""
            method="get"
            className="text-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-purple-700 text-4xl font-bold"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 sm:text-sm mx-auto mt-4"
                placeholder="Ihre Email hier"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-purple-700 text-4xl font-bold "
                value={password}
                onChange={handleChange}
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-4"
                placeholder="Ihr Password hier"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-8 mt-8">
              {/* Diese route ist nur für Test */}

              <Link to="/home">
                {" "}
                <button
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto"
                  type="submit"
                >
                  Login
                </button>
              </Link>
            </div>
          </form>

          <div className=" flex flex-col ">
            <Link to="/register">
              {" "}
              <p className="flex justify-center text-purple-700 font-bold pt-4">
                Registrieren
              </p>
            </Link>
            <a
              href="#"
              className="flex justify-center text-purple-700 font-bold pt-2"
            >
              Password vergessen?
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
