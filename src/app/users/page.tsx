import React from "react";

type User ={
  id: number,
  name: string,
}

const Users = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <div>
      <h2 className="text-2xl font-bold">Users</h2>
      {users.map((user) => (
        <div key={user.id} className="border border-t-0 border-x-0">
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
