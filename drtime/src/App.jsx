import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startsite from "./component/Startsite";
import HomePage from "./component/HomePage";
import Header from "./component/Header";
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
import PopMenu from "./component/PopMenu";
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
                <Route path="/" element={<GlobalLayout />}>
                  <Route index element={<Startsite />} />
                  <Route
                    path="login"
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
                    path="register"
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
                  <Route path="/home" element={<HomePage />} />
                  <Route
                    path="auth"
                    element={
                      <ProtectedLayout isAuthenticated={isAuthenticated} />
                    }
                  >
                    <Route index element={<Profil user={user} />} />
                    <Route path="me" element={<EditProfil />} />
                    <Route path="search" element={<ArtzSuchen />} />
                    <Route path="profilDoc" element={<ArtzProfil />} />
                    <Route path="MyCalendar" element={<MyCalendar />} />
                    <Route path="ArtzSuchen" element={<ArtzSuchen />} />
                    <Route path="doctors/:id" element={<ArtzProfil />} />
                    <Route path="Description" element={<Description />} />
                    <Route path="doctors/:id" element={<ArtzBestätigen />} />
                    <Route
                      path="TermineBestätigung"
                      element={<TermineBestätigung />}
                    />
                    <Route path="MyTermine" element={<MyTermine />} />
                  </Route>
                </Route>
                <Route element={<Header />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
