export default function Login () {
    
    return (
        <>
        <div className="flex justify-center flex-col">
            <div className="p-48">
            <h1 className="text-purple-700 flex justify-center items-center  text-5xl font-bold">DrTime</h1>
            </div>

            <div  className="flex flex-col justify-center">
            <form action="" method="get" className="text-center">
          <div className="mb-4">
            <label htmlFor="email" className="text-purple-700 text-4xl font-bold ">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 sm:text-sm mx-auto"
              placeholder="Ihre Email hier"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" 
            className="text-purple-700 text-4xl font-bold ">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="placeholder-italic placeholder-slate-400 block bg-white w-80 border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm sm:text-sm mx-auto"
              placeholder="Ihr Password hier"
            />
          </div>

          <div className="mb-8">
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-72 h-20 text-3xl text-white mx-auto">
              Login
            </button>
          </div>

        </form>

            <div className=" flex flex-col ">
                    <a href="#"
                    className="flex justify-center text-purple-700 font-bold pt-4">Registrieren</a>
                    <a href="#"
                     className="flex justify-center text-purple-700 font-bold pt-2">Password vergessen?</a>
                </div>

            </div>
        </div>
        </>
        
    )
}