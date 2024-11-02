'use client'
import React, { useEffect } from "react";

const Target = () => {
  useEffect(() => {
    const myDiv = document.getElementById("mydiv");
    myDiv?.addEventListener("click", (e: MouseEvent) => {
      console.log("currentTarget : ", (e.currentTarget as HTMLElement)?.tagName);
      console.log("target : ", (e.target as HTMLElement)?.tagName);
    });

    return () => {
      myDiv?.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div>
      Target
      <div id="mydiv">
        <p className="border border-blue-300 w-32 hover:border-blue-600 hover:border-2">나는 나다</p>
        <a href="#" className="border border-blue-300 w-32 hover:border-blue-600 hover:border-2">우리나라</a>
      </div>
    </div>
  );
};

export default Target;
