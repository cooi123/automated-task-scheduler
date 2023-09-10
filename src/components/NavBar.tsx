import React from "react";

type NavBarProps = {
  username?: string;
  onLogin?: () => void;
  onLogout?: () => void;
};

function NavBar({username, onLogin, onLogout}: NavBarProps) {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Brand or Logo */}
          <a href="/">
            <span className="text-xl font-semibold">To Do Transformer</span>
          </a>

          {/* Links for Calendar and Tasks */}
          <div className="space-x-4">
            <a href="/" className="hover:text-gray-400">
              Add Tasks
            </a>
            <a href="/allTasks" className="hover:text-gray-400">
              All Tasks
            </a>
            <a href="/calendar" className="hover:text-gray-400">
              Calendar
            </a>
          </div>

          {/* Profile & Action Buttons */}
          <div className="flex items-center space-x-4">
            {username ? (
              <>
                <span className="mr-4">Hello, {username}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
