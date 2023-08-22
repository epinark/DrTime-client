import React, { useState } from 'react';
import Header from "./Header";
import silhouetteProfil from "../assets/img-profil/silhouetteProfil.png";
export default function Profil() {
    // document.querySelector('.pp').addEventListener('click',()=>{
    //     document.querySelector('.pic').style.display=none;
    //     document.querySelector('.choosePic').style.display=flex;
    // });
    // const [profileImage, setProfileImage] = useState(silhouetteProfil);
    //     const [picVisible, setPicVisible] = useState(true);
    //     const [choosePicVisible, setChoosePicVisible] = useState(false);
      
    //     const handleClick = () => {
    //       setPicVisible(false);
    //       setChoosePicVisible(true);
    //     };

    // const handleImageChange = (event) => {
    //     const selectedImage = event.target.files[0]
    //     if (selectedImage) {
    //         const imageUrl = URL.createObjectURL(selectedImage);
    //         setProfileImage(imageUrl);
    //         setPicVisible(false);
    //         setChoosePicVisible(true);
    //     }
    //     ;}
    return (
        <>
            <div>
                <Header />
            </div>
        
            <div className=" flex justify-center items-center  mt-20 flex-col ">
                <p className="text-5xl font-bold ">
                    Profile
                </p>
                <div className="justify-center rounded-full  mb-5 cursor-pointer pp"   >
                    {/* onClick={handleClick} */}
                <label for="profilPic"><img src={silhouetteProfil} alt="Image Silhouette" className="w-40 h-40 pic" /></label> 
                {/*picVisible && */}
                <input type="file" className="choosePic hidden"  id='profilPic'/>{/*choosePicVisible && onChange={handleImageChange}  */} 
                
                </div>
                <p className="profil-name text-xl font-bold mb-10">
                    John Doe
                </p>
                <p className="profil-mail text-xl font-bold mb-10">
                    JohnDoe@gmail.com
                </p>
                <p className="profil-tel text-xl font-bold mb-10">
                    +4956456332
                </p>
                <p className="profil-date text-xl font-bold mb-10">
                    10/09/2001
                </p>
 
             <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer ">
              Bearbeiten
            </button>
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer">
              Zurück
            </button>
            </div>
        </> 
    )

}
