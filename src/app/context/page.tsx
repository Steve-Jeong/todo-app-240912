"use client";
import { createContext, useState, useMemo } from "react";
import UserInput from "./UserInput";
import UserShow from "./UserShow";

type UserShow = {
  name: string;
  age: number | string;
};

type UserContextType = {
  user: UserShow;
  setUser: React.Dispatch<React.SetStateAction<UserShow>>;
};

export const UserContext = createContext<UserContextType>({
  user: { name: "", age: 0 },
  setUser: () => {},
});

export default function Application() {
  const [user, setUser] = useState<UserShow>({ name: "", age: "" });
  const value = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider value={value}>
      <UserInput />
      <UserShow />
    </UserContext.Provider>
  );
}
