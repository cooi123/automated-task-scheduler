import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {handleLogin, handleSignOut} from "../api/SupabaseAuth";
function NavBar() {
  const session = useSession();
  const supabase = useSupabaseClient();
  console.log(session?.user);
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <a href="/" className="text-2xl font-bold">
              To Do
            </a>
          </div>
          <div className="flex items-center">
            {session ? (
              <a href="/profile" className="ml-4">
                <span className="ml-2">
                  {session ? session.user.user_metadata.full_name : ""}
                </span>
                <img
                  src={session.user.user_metadata.avatar_url} // Replace with your user's image path or URL
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
                <button
                  className="ml-4"
                  onClick={() => handleSignOut(supabase)}
                >
                  Logout
                </button>
              </a>
            ) : (
              <button className="ml-4" onClick={() => handleLogin(supabase)}>
                Login{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
