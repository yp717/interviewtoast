import * as React from "react";
import { useAuth } from "../context/auth-context";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between">
      <p>Header</p>
      {user && <button onClick={logout}>logout</button>}
    </div>
  );
};

export default Header;
