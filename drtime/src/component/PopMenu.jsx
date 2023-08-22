import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { BiMenu } from "react-icons/bi";
 
export default function PopupGfg() {
    return (
        <div >
            
            <Popup trigger=
                {<button> <BiMenu />  </button>}
                modal nested>
                {
                     
                        <div id='sd' className='h-96  bg-cyan-400 px-2'>
                            <div className='flex flex-col  '>
                                <div className='flex justify-center pt-4'>
                              <Link to="/profil"> 
                               <button className='bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-44 h-14 text-white'>
                                Profil
                                </button>
                              </Link>
                                </div>

                                <div className='flex justify-center pt-4'>
                               <Link to ='/profilDoc'><button className='bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-44 h-14 text-white'>
                                Arzt ändern
                                </button>
                               </Link> 
                                </div>
                            </div>

                                <div className='flex justify-center pt-44'>
                                <button className='bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-full w-44 h-14 text-white'>Ausloggen</button>
                                </div>
                        </div>
                    
                }
            </Popup>
        </div>
    )
}