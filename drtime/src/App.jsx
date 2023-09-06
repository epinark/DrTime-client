import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startsite from "./component/Startsite";
import HomePage from "./component/HomePage";
import Register from "./component/Register";
import Login from "./component/Login";
import Profil from "./component/Profil";
import EditProfil from "./component/EditProfil";
import ArtzSuchen from "./component/ArtzSuchen";
import ArtzProfil from "./component/ArtzProfil";
import MyCalendar from "./component/MyCalendar";
import Description from "./component/Description";
import ArtzBestätigen from "./component/ArtzBestätigen";
import TermineBestätigung from "./component/TermineBestätigung";
import MyTermine from "./component/MyTermine";
import { getUser } from "./utils/authUtils";
import GlobalLayout from "./component/GlobalLayout";
import ProtectedLayout from "./component/ProtectedLayout";

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuthRequest, setLoadingAuthRequest] = useState(false);
  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoadingAuthRequest(true);
        const { data, error } = await getUser(token);
        if (error) throw error;
        setUser(data);
        setIsAuthenticated(true);
        setLoadingAuthRequest(false);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setLoadingAuthRequest(false);
        console.error(error.message);
      }
    };
    token && validateToken();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="phone-frame">
        <div className="s20-ultra">
          <BrowserRouter>
            <div className="bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400  min-h-screen ">
              <Routes>
                <Route index element={<Startsite />} />

                <Route
                  path="/login"
                  element={
                    <Login
                      isAuthenticated={isAuthenticated}
                      setIsAuthenticated={setIsAuthenticated}
                      setToken={setToken}
                      loadingAuthRequest={loadingAuthRequest}
                      setLoadingAuthRequest={setLoadingAuthRequest}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Register
                      isAuthenticated={isAuthenticated}
                      setIsAuthenticated={setIsAuthenticated}
                      setToken={setToken}
                      loadingAuthRequest={loadingAuthRequest}
                      setLoadingAuthRequest={setLoadingAuthRequest}
                    />
                  }
                />

                <Route path="/" element={<GlobalLayout logOut={logOut} />}>
                  <Route path="/home" element={<HomePage user={user} />} />
                  <Route
                    path="auth"
                    element={
                      <ProtectedLayout isAuthenticated={isAuthenticated} />
                    }
                  >
                    <Route index element={<Profil user={user} />} />
                    <Route path="auth" element={<EditProfil />} />
                  </Route>
                  <Route
                    path="doctors/:id"
                    element={<ArtzBestätigen user={user} />}
                  />
                  <Route
                    path="/ArtzProfil/:id"
                    element={<ArtzProfil user={user} />}
                  />
                  <Route
                    path="/MyCalendar/:id"
                    element={<MyCalendar user={user} />}
                  />
                  <Route path="/ArtzSuchen" element={<ArtzSuchen />} />
                  <Route
                    path="/Description/:id"
                    element={<Description user={user} />}
                  />
                  <Route path="doctors" element={<ArtzSuchen />} />
                  <Route
                    path="TermineBestätigung"
                    element={<TermineBestätigung user={user} />}
                  />
                  <Route
                    path="/MyTermine"
                    element={<MyTermine user={user} />}
                  />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
