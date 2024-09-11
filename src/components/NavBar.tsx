"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const navBar = [
    { href: "/", name: "Home" },
    { href: "/todos", name: "Todos" },
    { href: "/users", name: "Users" },
    { href: "/image", name: "Image" },
    { href: "/todos2", name: "Todos with 'use client' and server action" },
    { href: "/todos3", name: "Todos with route handler - json" },

  ];

  const path = usePathname();
  // console.log("nav path:", path);
  return (
    <div className="px-6 py-4 flex flex-wrap gap-4 text-xl font-bold" id="navbar">
      {navBar.map((nav) => {
        const isActive = path === nav.href;
        const activeLink = isActive
          ? "bg-blue-500 text-white"
          : "bg-white text-blue-500";
        return (
          <div key={nav.name}>
            <Link href={nav.href} className={`p-2 ${activeLink} hover:outline`}>
              {nav.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
