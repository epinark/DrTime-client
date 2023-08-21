import Header from "../../../src/component/Header";
export default function Profil() {
    
    return (
        <>
            <div>
                <Header />
            </div>
            <div id="Start" className="flex justify-center items-center mb-5 mt-15 text-7xl font-bold">
                {/* <h1 className="text-purple-700" >
                     DrTime
                </h1> */}
            </div>
            <div className=" flex justify-center items-center mb-5 mt-20 flex-col space">
                <p className="text-xl font-bold mb-2">
                    Profile
                </p>
                <div className="justify-center rounded-full w-20 h-20 mb-5 cursor-pointer "  >
                    <img src="../src/assets/img-profil/silhouette-profil.png" alt="Image Silhouette" className="" />
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

                <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer hover:from-blue-900 ">
              Bearbeiten
            </button>
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5 cursor-pointer">
              Zurück
            </button>
            </div>
        </> 
    )
}