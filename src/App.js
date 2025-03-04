import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import DataTable from "./pages/table/DataTable";
import Parkings from "./pages/parking/Parkings";
import AddParking from "./pages/parking/AddParking";
import EditParking from "./pages/parking/EditParking";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Main routes - no layout wrapper needed */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data" element={<DataTable />} />
        <Route path="/parkings" element={<Parkings />} />
        <Route path="/add-parking" element={<AddParking />} />
        <Route path="/edit-parking/:id" element={<EditParking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
