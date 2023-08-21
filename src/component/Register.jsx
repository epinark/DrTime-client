import Header from "./Header"

export default function Register() {
    return (
        <>
        <div>
            <Header />
        </div>


        <div className='pt-4 flex justify-center '>
            <div className="flex justify-center flex-col">
                <form action="get">
                    <div id="my Form">
                        <div className="flex mb-4">
                            <div className="flex flex-col">
                                <label htmlFor="name"
                                className="text-xl font-bold mb-2">Vorname</label>
                                <input type="text" 
                                className="placeholder-italic placeholder-slate-400 block bg-white w-32 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mr-8"
                                placeholder="John"/>
                            </div>

                            <div className="flex flex-col ">
                                <label htmlFor=""
                                className="text-xl font-bold mb-2">Nachname</label>
                                <input type="name"
                                className="placeholder-italic placeholder-slate-400 block bg-white w-32 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto"
                                placeholder="Doe" />
                            </div>
                        </div>

                        <div className="mb-4">
                        <label htmlFor="email" className="text-xl font-bold ">
                            Email:
                            </label>
                            <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="placeholder-italic placeholder-slate-400 block w-80 border  rounded-full py-2 pl-9 sm:text-sm mt-2"
                            placeholder="Ihre Email hier"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" 
                            className="t text-xl font-bold ">
                            Password:
                            </label>
                            <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mt-2"
                            placeholder="Ihr Password hier..."
                            />
                         </div>

                         <div className="mb-4">
                            <label htmlFor="password" 
                            className="t text-xl font-bold ">
                            Password wiederholen:
                            </label>
                            <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"
                            placeholder="Ihr Password wieder hier..."
                            />
                         </div>

                         <div className="flex justify-between items-center mt-7">
                            <label htmlFor=""
                            className=" text-xl font-bold ">
                                Geburstdatum</label>
                            <input type="date" 
                            className="placeholder-italic placeholder-slate-400 block bg-white w-40 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto "/>
                         </div>

                         <div className="mt-4">
                            <label htmlFor=""
                            className=" text-xl font-bold ">Handynummer</label>
                            <input type="tel" name="telefon" id="telefon" 
                            className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"/>
                         </div>

                         <div className="mt-4">
                         <label htmlFor=""
                            className=" text-xl font-bold ">
                                KV-Nummer</label>
                                <input type="text" 
                                className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto mt-2"/>

                         </div>




                    </div>


                </form>
            </div>

        </div>
        </>

    )
}