import React, { useState, useEffect } from "react";
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profil({user}) {
  const [file, setfile] = useState("");
  let [image, setimage] = useState("");

//edit fonction
const [name, setName] = useState(user.firstName + " " + user.lastName);
const [email, setEmail] = useState(user.email);
const [telefon, setTelefon] = useState(user.telefon);
const [insuranceNumber, setInsuranceNumber] = useState(user.insuranceNumber);
const [PLZ, setPLZ] = useState(user.PLZ);
const [city, setCity] = useState(user.city);
const [isEditing, setIsEditing] = useState(false);

const handleEditingClick = () =>{
    setIsEditing(true);
};

const handleSaveClick = () =>{
  

  setIsEditing(false);
};

const handleNameChange = (e) => {
  setName(e.target.value);
};

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handleTelefonChange = (e) => {
    setTelefon(e.target.value);
};
const handlePLZChange = (e) => {
  setPLZ(e.target.value);
};
const handleCityChange = (e) => {
  setCity(e.target.value);
};

const handleInsuranceNumberChange = (e) => {
    setInsuranceNumber(e.target.value);
};



//ProfilBild
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
      // console.log(image);
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
      // console.log(result.data);
    } catch (err) {
      console.log(err);
    }
    //console.log(e.target.files);
    // setfile(e.target.files)
  };
  console.log(user);


  return (
    <>
      <div>
        <Header />
      </div>

      <div className=" flex  items-center  flex-col ">
        <div className="mb-20 mt-5">
          <p className="text-5xl font-bold ">Profil</p>
        </div>

        <div className="justify-center   pp absolute mt-20">
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
         
        <div  className="profil-name scroll font-bold mb-5 mt-40 flex flex-col justify-center items-center text-2xl text-purple-700    ">
       
       
        {isEditing ? ( 
          <>

          <input
          className="editingStyle"
          type= "text"
          value={name}
          onChange={handleNameChange}
          placeholder= "Kompleter Name"
          />

           <input
           className="editingStyle"
          type= "text"
          value={email}
          onChange={handleEmailChange}
          placeholder= "Email"
          />

          <input
          className="editingStyle"
          type= "number"
          value={PLZ}
          onChange={handlePLZChange}
          placeholder= "PLZ"
          />

          <input
          className="editingStyle"
          type= "number"
          value={telefon}
          onChange={handleTelefonChange}
          placeholder= "Telefon"
          />

          <input
          className="editingStyle"
          type= "text"
          value={city}
          onChange={handleCityChange}
          placeholder= "City"
          />

          <input
          className="editingStyle"
          type= "text"
          value={insuranceNumber}
          onChange={handleInsuranceNumberChange}
          placeholder= "Insurance number"
          />

        <button
          className="btn btn-primary font-bold save-button"
          onClick={handleSaveClick}
        >
          save
        </button>

          </>
        ) : (  
          
          <>
       <p > { `${user.firstName} ${user.lastName}`}</p>
       <p > { `${user.email}`} </p>
       <p > { `${user.telefon} `}</p>
       <p > { `${user.PLZ}`}</p>
       <p >{ `${user.city}`} </p>
       <p >{ `${user.insuranceNumber}`}</p>

       
     
         {/* <Link to="/auth/me"> */}
          <button onClick={handleEditingClick} className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer ">
            Bearbeiten
          </button>
        {/* </Link> */}
      </>
        )}
         </div>
        
        <Link to="/home">
          <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto cursor-pointer">
            Zurück
          </button>
        </Link>
      </div>
    </>
  );
}
