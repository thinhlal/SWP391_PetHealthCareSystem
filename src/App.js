// import { Routes, Route, Link } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import Booking from './pages/Booking/Booking.js';
import Home from './pages/Home/Home.js';
import SignUp from './pages/SignUp/SignUp.js';
import ManageListBooking from './pages/ManageBooking/ManageListBooking.js';

function App() {
  return (
    <Routes>
      <Route path="/booking" element={<Booking />} />
      <Route path="/" element={<Home />} /> 
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/manage-booking" element={<ManageListBooking />} />
    </Routes>
  );
}

export default App;
