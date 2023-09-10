import React from "react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {getFutureEvents} from "./api/GoogleCalendar";
import {getAllTaskLists} from "./api/GoogleTasks";
import {handleLogin, handleSignOut} from "./api/SupabaseAuth";
import NavBar from "./components/NavBar";
import {TasksPage} from "./pages/TasksPage";
import {sendGPT} from "./api/OpenAI";
import CalendarPage from "./pages/CalendarPage";
import {AllTasksPage} from "./pages/AllTasksPage";
function App() {
  const session = useSession();
  const supabaseClient = useSupabaseClient();
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar
        username={session?.user.user_metadata.full_name}
        onLogin={() => handleLogin(supabaseClient)}
        onLogout={() => supabaseClient.auth.signOut()}
      />
      <Router>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="alltasks" element={<AllTasksPage />} />
        </Routes>
      </Router>

      {/* Rest of your content */}
    </div>
  );
}

export default App;
