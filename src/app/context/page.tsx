"use client";
import { createContext, useState, useMemo } from "react";
import UserInput from "./UserInput";
import UserType from "./UserShow";

type UserType = {
  name: string;
  age: number | string;
};

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

export const UserContext = createContext<UserContextType>({
  user: { name: "", age: 0 },
  setUser: () => {},
});

export default function Application() {
  const [user, setUser] = useState<UserType>({ name: "", age: "" });
  const value = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider value={value}>
      <UserInput />
      <UserType />
    </UserContext.Provider>
  );
}
