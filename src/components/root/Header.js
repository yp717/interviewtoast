import { Link } from "gatsby"
import * as React from "react"
import Logo from "../../assets/Logo"
import { useAuth } from "../../context/auth-context"
import useOutsideAlerter from "../../hooks/useOutsideAlerter"

const Header = () => {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const menuRef = React.useRef(null)
  useOutsideAlerter(menuRef, () => setMenuOpen(false))
  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto px-2 py-2 md:pt-6">
      <Link
        to={user ? "/dashboard" : "/"}
        className="flex items-center font-bold group hover:text-orange-400"
      >
        <Logo className="h-8 w-8 group-hover:animate-bounce" alt="Toast" />
        <h1 className="text-xl">InterviewToast</h1>
      </Link>
      {user && (
        <div className="relative">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center space-x-1"
          >
            <div className={`p-1 rounded-t ${menuOpen ? "1 bg-gray-600" : ""}`}>
              <img
                src={user.photoURL}
                className={`h-8 w-8 rounded-full relative z-30 `}
              />
            </div>
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute top-0 z-20 right-0 mt-10 w-48 rounded-b rounded-tl text-gray-100 bg-gray-600 shadow-lg space-y-2 divide-y pt-2 divide-gray-700 "
            >
              <Link to="/dashboard" className="hover:text-orange-400 p-2">
                Dashboard
              </Link>
              <div className="p-2">
                <button onClick={logout} className="btn-primary w-full">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
