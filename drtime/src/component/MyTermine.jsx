import Header from "./Header";
import PropTypes from 'prop-types';

export default function MyTermine({ citasSeleccionadas }) {

    MyTermine.propTypes = {
        citasSeleccionadas: PropTypes.array.isRequired, // Define la validación para citasSeleccionadas
      };

  return (
    <>
      <div>
        <div>
          <Header />
        </div>
        <div id="Hier die termine">
          <div>
            <h1>Termine</h1>
          </div>
          <div id="Weisse platz" className="bg-white rounded-xl m-5">
            <div className="flex flex-col justify-center">
              {citasSeleccionadas.length > 0 ? (
                citasSeleccionadas.map((cita, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 
                    rounded-full flex justify-center items-center flex-col text-white font-bold h-36 m-3"
                  >
                    <span className="mb-4 text-xl">HausArzt</span>
                    <span>Date: {cita.fecha}</span>
                    <span>Time: {cita.hora}</span>
                  </div>
                ))
              ) : (
                <p>Du hast noch kein Termin</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
