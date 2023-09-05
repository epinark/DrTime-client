import React, { useState, useEffect } from "react";
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profil({ user }) {
  const [file, setfile] = useState("");
  let [image, setimage] = useState("");

  useEffect(() => {
    fetch("/profil")
      .then((res) => res.json())
      .then((image) => setimage(image));
  }, []);

  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      image = setimage(reader.result);
      console.log(image);
    };
  }
  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setfile(file);

    previewFiles(file);
    console.log(file);
    // setfile(e.target.files)
  };

  const handleSubmit = async (e) => {
    const result = await axios.post("http://localhost:5000", {
      image: image,
    });

    try {
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
    //console.log(e.target.files);
    // setfile(e.target.files)
  };
  return (
    <>
      <div className=" flex  items-center  flex-col ">
        <div className="mb-20 mt-5">
          <p className="text-5xl font-bold ">Profil</p>
        </div>

        <div className="justify-center    pp absolute mt-20">
          <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="profilPic">
              <img
                src={image ? image : silhouetteProfil}
                className=" w-40 h-40 pic rounded-full mb-2"
                placeholder=""
              />
            </label>

            <input
              type="file"
              className="choosePic hidden "
              name="Bild"
              id="profilPic"
              onChange={(e) => handleChange(e)}
              required
              accept="image/png, image/jpeg, image/jpg, image/jfif"
            />
            <button className="btn btn-primary  font-bold">Save</button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center mt-36 text-purple-700">
          <p className="profil-name text-2xl font-bold mb-5 mt-60 ">
            {user.firstName}
          </p>
          <p className="profil-mail text-2xl font-bold mb-5">{user.email}</p>
          <p className="profil-tel text-2xl font-bold mb-5">{user.telefon}</p>
          <p className="profil-date text-2xl font-bold mb-5">{user.PLZ}</p>
          <p className="profil-date text-2xl font-bold mb-5">{user.city}</p>
          <p className="profil-date text-2xl font-bold mb-5">
            {user.insuranceNumber}
          </p>
        </div>
        <div className="flex flex-col justify-center mt-20">
          <Link to="/auth/me">
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer ">
              Bearbeiten
            </button>
          </Link>
          <Link to="/home">
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto cursor-pointer">
              Zurück
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
