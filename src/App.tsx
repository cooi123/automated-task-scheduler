import React from "react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {getFutureEvents} from "./api/GoogleCalendar";
import {getAllTaskLists} from "./api/GoogleTasks";
import {handleLogin, handleSignOut} from "./api/SupabaseAuth";
import NavBar from "./components/NavBar";
import {TasksPage} from "./pages/TasksPage";
import {sendGPT} from "./api/OpenAI";
function App() {
  // sendGPT();

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <TasksPage />

      {/* Rest of your content */}
    </div>
  );
}

export default App;
