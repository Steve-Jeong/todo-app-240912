import { useContext } from "react";
import { UserContext } from "./page";

export default function UserInput() {
  const { user, setUser } = useContext(UserContext);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  return (
    <div className="flex gap-4">
      <input
        type="text"
        name="name"
        aria-label="Name" // {{ edit_1 }}
        placeholder="Enter your name" // {{ edit_2 }}
        value={user.name}
        onChange={changeHandler}
        className="border"
      />
      <input
        type="text"
        name="age"
        aria-label="Age" // {{ edit_1 }}
        placeholder="Enter your age" // {{ edit_2 }}
        value={user.age}
        onChange={changeHandler}
        className="border"
      />
    </div>
  );
}
