import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Reservations from "./pages/Reservations";
import Preferences from "./pages/Preferences";
import Allocation from "./pages/Allocation";
import AI from "./pages/AI";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;