import { Link } from "react-router-dom";
import DRTIME from "../assets/images/DRTIME.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Startsite() {
  const [showImage, setShowImage] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 5000);
  });

  return (
    <div
      id="Start"
      className="flex justify-center items-center  h-screen scroll "
    >
      <div className="parent-div ml-7 mr-7">
        <img src={DRTIME} alt="drtime" className=" " />
      </div>
    </div>
  );
}
