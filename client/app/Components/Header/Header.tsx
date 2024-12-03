"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie"; // For handling cookies

function Header() {
  const { user, logout } = useUserContext(); // Assuming logout function is provided in the user context
  const { openModalForAdd, activeTasks } = useTasks();
  const router = useRouter();

  const { name } = user;
  const userId = user._id;

  const handleLogout = () => {
    // Clear user session (example: removing token from cookies or context)
    Cookies.remove("authToken"); // Assuming the auth token is stored in a cookie
    logout(); // This will clear the user context (add this function in userContext)
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to Taskfyer"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        {userId ? (
          <button
            className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
            hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
            onClick={() => {
              openModalForAdd();
            }}
          >
            Add a new Task
          </button>
        ) : (
          <button
            className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
            hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login / Register
          </button>
        )}

        {userId && (
          <button
            className="px-8 py-3 bg-[#FF4D4D] text-white rounded-[50px]
            hover:bg-[#FF0000] hover:text-white transition-all duration-200 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

        <div className="flex gap-4 items-center">
          <Link
            href="https://chandusiriyala-portfolio.vercel.app"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {profile}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
