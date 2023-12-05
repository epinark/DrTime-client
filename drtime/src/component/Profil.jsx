import React, { useState, useEffect } from "react";
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profil({ user }) {
  const [file, setfile] = useState("");
  const [updatedProfile, setUpdatedProfile] = useState({ user });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    // email: "",
    birthDate: "",
    insuranceNumber: "",
    PLZ: "",
    city: "",
  });

  function updateUser(user, newUser) {
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    // user.email = newUser.email;
    user.birthDate = newUser.birthDate;
    user.insuranceNumber = newUser.insuranceNumber;
    user.PLZ = newUser.PLZ;
    user.city = newUser.city;
  }
  //ProfilBild   <img src="http://res.cloudinary.com/dygtyitsh/image/upload/v1693924213/KundenBilder/ygdazn4jttwfpa6owass.jpg" class=" w-40 h-40 pic rounded-full mb-2" placeholder="">

  // let [image, setImage] = useState("");
  // const [url, setUrl] = useState("");

  // const updateProfileWithImageUrl = (imageUrl) => {
  //   const updatedProfile = { ...user, profilePhoto: imageUrl };

  //   axios
  //     .put(
  //       `${import.meta.env.VITE_APP_DR_TIME}/auth/me/${user._id}`,
  //       updatedProfile,
  //       { headers: { Authorization: `Bearer $localStorage.getItem("token")}` } }
  //     )

  //     .then((response) => {
  //       console.log("Profil mis a jour");
  //     })
  //     .catch((error) => {
  //       console.error("erreur lors de la  mise a jour profil", error);
  //     });
  // };
  const handleSaveClick = async () => {
    try {
      setLoading(true);

      const updatedProfile = { ...user, ...newUser };

      const response = await axios.put(
        `${import.meta.env.VITE_APP_DR_TIME}/auth/me`,
        { updatedProfile: updatedProfile, userId: user._id },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUpdatedProfile(response.data);
      setIsEditing(false);
      setLoading(false);
      updateUser(user, newUser);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "unsigned_upload");
    data.append("cloud_name", "dygtyitsh");
    fetch("https://api.cloudinary.com/v1_1/dygtyitsh/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);

        //upload url in profile
        setUrl(data.url);
        // Appeler une fonction pour mettre à jour l'URL dans le profil
        updateProfileWithImageUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const handleEditingClick = () => {
    updateUser(newUser, user);
    setIsEditing(true);
  };

  //save edit
  // const handleSaveClick = () =>{
  //   setIsEditing(false);
  // };

  const handleNameChange = (e) => {
    setNewUser({ ...newUser, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setNewUser({ ...newUser, lastName: e.target.value });
  };

  // const handleEmailChange = (e) => {
  //   setNewUser({ ...newUser, email: e.target.value });
  // };

  const handleBirthDateChange = (e) => {
    setNewUser({ ...newUser, birthDate: e.target.value });
  };
  const handlePLZChange = (e) => {
    setNewUser({ ...newUser, PLZ: e.target.value });
  };
  const handleCityChange = (e) => {
    setNewUser({ ...newUser, city: e.target.value });
  };

  const handleInsuranceNumberChange = (e) => {
    setNewUser({ ...newUser, insuranceNumber: e.target.value });
  };

  return (
    <>
      {user && user._id && updatedProfile && (
        <div className=" flex  items-center  flex-col ">
          <div className="mb-20 mt-5">
            <p className="text-5xl font-bold ">Profil</p>
          </div>

          <div className="justify-center   pp absolute mt-20">
            <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="profilPic">
                <img
                  // src={user ? user.profilePhoto : silhouetteProfil}
                  src={silhouetteProfil}
                  className=" w-40 h-40 pic rounded-full mb-2"
                  placeholder=""
                />
              </label>

              <input
                type="file"
                className="choosePic hidden "
                name="Bild"
                id="profilPic"
                onChange={(e) => setImage(e.target.files[0])}
                required
                accept="image/png, image/jpeg, image/jpg, image/jfif"
              />
              {/* <button
                onClick={() => handleSaveClick()}
                className="btn btn-primary  font-bold"
              >
                Save
              </button> */}
            </form>
          </div>

          <div className="profil-name scroll font-bold mb-5 mt-40 flex flex-col justify-center items-center text-2xl text-purple-700 ">
            {isEditing ? (
              <>
                <input
                  className="editingStyle edit-name"
                  type="text"
                  value={newUser.firstName}
                  onChange={handleNameChange}
                  placeholder={user.firstName}
                />

                <input
                  className="editingStyle edit-lastname"
                  type="text"
                  value={newUser.lastName}
                  onChange={handleLastNameChange}
                  placeholder={user.lastName}
                />
                {/* 
                <input
                  className="editingStyle"
                  type="text"
                  value={newUser.email}
                  onChange={handleEmailChange}
                  placeholder={user.email}
                /> */}

                <input
                  className="editingStyle edit-birthdate"
                  type="date"
                  value={newUser.birthDate}
                  onChange={handleBirthDateChange}
                  placeholder={user.birthDate}
                />

                <input
                  className="editingStyle edit-postalcode"
                  type="number"
                  value={newUser.PLZ}
                  onChange={handlePLZChange}
                  placeholder={user.PLZ || "PLZ"}
                />

                <input
                  className="editingStyle edit-city"
                  type="text"
                  value={newUser.city}
                  onChange={handleCityChange}
                  placeholder={user.city || "Stadt"}
                />
                <input
                  className="editingStyle edit-insuranceno"
                  type="text"
                  value={newUser.insuranceNumber}
                  onChange={handleInsuranceNumberChange}
                  placeholder={user.insuranceNumber || "Versicherungsnummer"}
                />

                <button
                  className="btn btn-primary font-bold save-button"
                  onClick={() => handleSaveClick()}
                >
                  save
                </button>
              </>
            ) : (
              updatedProfile && (
                <>
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  {/* <p>{`${user.email}`} </p> */}
                  {user.birthDate && (
                    <p>
                      {new Date(user.birthDate).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  {user.PLZ && <p>{`${user.PLZ}`}</p>}
                  {user.city && <p>{`${user.city}`} </p>}
                  {user.insuranceNumber && <p>{`${user.insuranceNumber}`}</p>}

                  <button
                    onClick={handleEditingClick}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto cursor-pointer"
                  >
                    Bearbeiten
                  </button>
                </>
              )
            )}
          </div>

          <Link to="/home">
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto cursor-pointer">
              Zurück
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
