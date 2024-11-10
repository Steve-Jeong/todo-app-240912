import { useContext } from "react";
import { UserContext } from "./page";

export default function UserShow() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div>
        <span>{user.name}</span>
      </div>
      <div>
        <span>{user.age}</span>
      </div>
    </>
  );
}
