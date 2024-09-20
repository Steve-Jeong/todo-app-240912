"use client";
import React, { useState } from "react";

export default function MyControlledInputs() {
  const [values, setValues] = useState({ first: "", last: "" });

  const getHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      firstName : <input value={values.first} name="first" onChange={getHandler} className="border"/>
      lastName : <input value={values.last} name="last" onChange={getHandler} className="border"/>
      <br />
      <p> your input is : {JSON.stringify(values, null, 2)} </p>
    </div>
  );
}
