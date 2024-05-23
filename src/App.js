// import { Routes, Route, Link } from 'react-router-dom'
// import SignUp from './SignUp.js';
import Booking from './Booking.js';
import { Routes, Route } from "react-router-dom";
import Home from './Home.js';
import SignUp from './SignUp.js';
import ManageListBooking from './ManageListBooking.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/manage-booking" element={<ManageListBooking />} />
    </Routes>
  );
}

export default App;
