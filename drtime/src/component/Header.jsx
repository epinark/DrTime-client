import PopupGfg from "./PopMenu";
import DRTIME from "../assets/images/DRTIME.png";

export default function Header() {
  return (
    <>
      <div className="flex justify-around pl-24 w-{100%} h-24 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500">
        <div className="flex justify-center items-center w-44">
          <img src={DRTIME} alt="logo" />
        </div>

        <div className="flex justify-center items-center text-4xl text-purple-700">
          <PopupGfg />
        </div>
      </div>
    </>
  );
}

export function HeaderBasic() {
  return (
    <>
      <div className="flex justify-center w-full h-24 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500">
        <div className="flex justify-center items-center w-44">
          <img src={DRTIME} alt="logo" />
        </div>
      </div>
    </>
  );
}
