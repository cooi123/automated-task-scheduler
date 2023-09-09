import React from "react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {getAllCalendarEvents} from "./api/GoogleCalendar";
import {getAllTaskLists} from "./api/GoogleTasks";
function App() {
  const session = useSession();
  const supabase = useSupabaseClient();

  async function handleLogin() {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
      },
    });

    if (error) {
      alert("Error logging in to google provider");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="container mx-auto bg-red-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
      <p className="text-gray-500 text-lg">React and Tailwind CSS in action</p>
      {session ? (
        <>
          <h2>Hey {session.user.email}</h2>
          <button
            onClick={() =>
              session.provider_token
                ? getAllCalendarEvents(session.provider_token).then(console.log)
                : console.log("no token")
            }
          >
            {" "}
            View calendar
          </button>

          <button
            onClick={() =>
              session.provider_token
                ? getAllTaskLists(session.provider_token).then(console.log)
                : console.log("no token")
            }
          >
            {" "}
            View tasks
          </button>
          <button onClick={() => signOut()}>Sign OUt</button>
        </>
      ) : (
        <button onClick={() => handleLogin()}>Sign in with Google</button>
      )}
    </div>
  );
}

export default App;
