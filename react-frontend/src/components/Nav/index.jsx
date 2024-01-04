import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";

function NavBar() {
  return (
    <>
      <nav className="bg-gray-800">
        <a href="/event" className="float-left">
          <img src={Logo} alt="Logo" className="h-10 w-10 mt-3 mb-3 ml-5" />
        </a>
        <div className="max-w-7xl  px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    to={"/home"}
                    hidden={!localStorage.getItem("token")}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/mybookings"}
                    hidden={!localStorage.getItem("token")}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Bookings
                  </NavLink>
                </div>
              </div>
            </div>
            <NavLink
              to={"/"}
              onClick={() => {
                localStorage.clear()
              }}
              className="float-right text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
