import axios from "axios";
import { createContext, useEffect, useState } from "react";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchuser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user not authenticated");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/users/userdetail",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user);
    };
    fetchuser();
  },[]);
  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};

export default userContext;
