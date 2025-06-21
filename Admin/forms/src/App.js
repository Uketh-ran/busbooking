import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminLogin from "./AdminLogin";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
// import Addbus from "./pages/Addbus.jsx";
import Offers from "./pages/Offers.jsx";
import Ac from "./pages/Ac.jsx";
import Nonac from "./pages/Nonac.jsx";
import User from "./pages/User.jsx";
import Booking from "./pages/Booking.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories/ac" element={<Ac/>} />
          <Route path="categories/non-ac" element={<Nonac/>} />
          <Route path="/admin/offers" element={<Offers />} />
          <Route path="/admin/users" element={<User />} />
          <Route path="/admin/bookings" element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
