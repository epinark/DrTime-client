import React, { useState, useEffect } from "react";
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profil() {
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
      <div>
        <Header />
      </div>

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
        <p className="profil-name text-xl font-bold mb-10 mt-60 ">John Doe</p>
        <p className="profil-mail text-xl font-bold mb-10">JohnDoe@gmail.com</p>
        <p className="profil-tel text-xl font-bold mb-10">+4956456332</p>
        <p className="profil-date text-xl font-bold mb-10">10/09/2001</p>
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
    </>
  );
}
