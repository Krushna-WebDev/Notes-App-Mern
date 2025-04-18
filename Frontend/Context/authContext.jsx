import { createContext, useEffect, useState } from "react";
import api from "../src/api";

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
      try {
        const response = await api.post("/users/userdetail");
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchuser();
  },[]);
  return (
    <userContext.Provider value={{ user,setUser }}>{children}</userContext.Provider>
  );
};

export default userContext;
