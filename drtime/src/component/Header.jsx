import PopupGfg from "./PopMenu";

export default function Header () {

    return (
        <>
        <div className="flex justify-around pl-24 w-{100%} h-24 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500">
            
                <div className="flex justify-center items-center">
                    <h1 className="text-purple-700 flex justify-center items-center  text-5xl font-bold">Dr Time</h1>
                </div>
            
            <div className="flex justify-center items-center text-4xl text-purple-700"> 
                <PopupGfg /> 
            </div>
        </div>
        </>
    )
}