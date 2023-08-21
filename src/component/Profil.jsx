import Header from "./Header";
export default function Profil() {
    
    return (
        <>
            <div>
                <Header />
            </div>
            <div id="Start" className="flex justify-center items-center  text-7xl font-bold">
                <h1 className="text-purple-700" >
                     DrTime
                </h1>
            </div>
            <div className=" flex justify-center flex-col">
                <p className="">
                    Profile
                </p>
                <div className="justify-center">
                        Photo
                </div>
                <p className="profil-name">
                    John Doe
                </p>
                <p className="profil-mail">
                    JohnDoe@gmail.com
                </p>
                <p className="profil-tel">
                    +4956456332
                </p>
                <p className="profil-date">
                    10/09/20023
                </p>

                <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5">
              Bearbeiten
            </button>
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto mb-5">
              Zurück
            </button>
            </div>
        </> 
    )
}