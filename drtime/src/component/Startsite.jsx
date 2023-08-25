
import { Link } from "react-router-dom";
import DRTIME from '../assets/images/DRTIME.png';
import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';



export default function Startsite() {
    const [showImage, setShowImage] = useState(true);

    
  // Time Out
    // const history = useHistory();

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         history.push('/login'); // Naviguez vers la nouvelle page après le délai
    //     }, 1000);

    //     // Nettoyage du timeout si le composant est démonté avant que le délai ne soit atteint
    //     return () => clearTimeout(timeoutId);
    // }, [history]);
    return (
        
      <div id="Start" className="flex justify-center items-center  h-screen ">
        <div className="parent-div">
      <Link to ="/login"><img src={DRTIME} alt="drtime"  />
      </Link>
      </div>
         
      </div>
        
    )
}