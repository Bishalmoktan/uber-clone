/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: any;
  userId: string;
  userType: "rider" | "user";
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [userId, setUserId] = useState<string>("");
  const [userType, setUserType] = useState<"rider" | "user">("user");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const newUser = JSON.parse(userData);
      setUser(newUser);
      setUserId(newUser._id);
      setUserType(newUser.vehicle ? "rider" : "user");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userId,
        userType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
