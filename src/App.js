// import { Routes, Route, Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking/Booking.js';
import Home from './pages/Home/Home.js';
import SignUp from './pages/SignUp/SignUp.js';
import ManageListBooking from './pages/ManageBooking/ManageListBooking.js';
import YourPet from './pages/YourPet/YourPet.js';
import Services from "./pages/Services/Services.js";
import Login from "./pages/Login/Login.js";
import ManageCages from './pages/ManageCages/ManageCages.js';
import ManageDoctorCalender from "./pages/ManageDoctorCalender/ManageDoctorCalender.js"
import WorkSchedule from'./pages/WorkSchedule/WorkSchedule.js';
import AdminDashBoard from './pages/AdminDashBoard/AdminDashBoard.js'
import ManageSickPet from './pages/ManageSickPet/ManageSickPet.js';
import YourBooking from './pages/YourBooking/YourBooking.js'
import AdminAccount from './pages/AdminAccount/AdminAccount.js';
import PetExamRecord from './pages/PetExamRecord/PetExamRecord.js';

function App() {
  return (
    <Routes>
      <Route path="/booking" element={<Booking />} />
      <Route path="/" element={<Home />} /> 
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/manage-booking" element={<ManageListBooking />} />
      <Route path="/your-pet" element={<YourPet />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path='/manage-cages' element={<ManageCages />} />
      <Route path="/manage-doctor-calender" element={<ManageDoctorCalender />} />
      <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      <Route path="/work_schedule" element={<WorkSchedule />} />
      <Route path="/sick-pet" element={<ManageSickPet />} />
      <Route path="/your-booking" element={<YourBooking />} />
      <Route path="/admin-account" element={<AdminAccount />} />
      <Route path="/pet_exam_record" element={<PetExamRecord />} />
    </Routes>
  );
}

export default App;
