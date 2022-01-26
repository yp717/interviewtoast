import { Link } from "gatsby"
import * as React from "react"
import Logo from "../../assets/Logo"
import { useAuth } from "../../context/auth-context"

const Header = () => {
  const { user, logout } = useAuth()
  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto px-2 py-2 md:pt-6">
      <Link
        to={user ? "/dashboard" : "/"}
        className="flex items-center font-bold group text-orange-400 hover:text-white"
      >
        <h1 className="text-xl">Interview</h1>
        <Logo className="h-8 w-8 group-hover:animate-bounce" alt="Toast" />
      </Link>
      {user && (
        <div className="flex items-center space-x-1">
          <p>{user.displayName}</p>
          <img src={user.photoURL} className="h-8 w-8 rounded-full" />
          <button onClick={logout} className="btn-primary">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
