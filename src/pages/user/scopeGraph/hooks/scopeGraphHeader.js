import { Link } from "react-router-dom";
import { PopupUserInformations } from "./popupUserInformations";
export const ScopeGraphHeader = ({userData, authentication, navigate}) => {
    return (
      <div className=' max-h-screen overflow-hidden'>
        <header className="flex sticky top-0 z-50 items-center justify-between flex-wrap bg-gray-50 dark:bg-gray-900 p-3">
          <div className="flex items-center flex-shrink-0 text-slate-700 dark:text-white">
            <Link to={'/'}><img className="fill-current h-10 w-10 mr-2" src={require("../../../../data/images/ScopeGraph.png")} alt="logo"></img></Link>
            <span className="font-semibold text-xl tracking-tight">ScopeGraph</span>
          </div>
          <div className="flex items-center mr-2">
            {PopupUserInformations(userData, navigate, authentication)}
          </div>
        </header>
      </div>
    );
  }