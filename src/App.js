// import { Routes, Route, Link } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import Booking from './pages/Booking/Booking.js';
import Home from './pages/Home/Home.js';
import SignUp from './pages/SignUp/SignUp.js';
import ManageListBooking from './pages/ManageBooking/ManageListBooking.js';
import YourPet from './pages/YourPet/YourPet.js';
import DoctorInfo from './pages/DoctorInfo/DoctorInfo.js';
import Services from "./pages/Services/Services.js";
import Login from "./pages/Login/Login.js";
import ManageDoctorCalender from "./pages/ManageDoctorCalender/ManageDoctorCalender.js"
function App() {
  return (
    <Routes>
      <Route path="/booking" element={<Booking />} />
      <Route path="/" element={<Home />} /> 
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/manage-booking" element={<ManageListBooking />} />
      <Route path="/your-pet" element={<YourPet />} />
      <Route path="/doctor" element={<DoctorInfo />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/manage-doctor-calender" element={<ManageDoctorCalender />} />
    </Routes>
  );
}

export default App;
