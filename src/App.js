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
import VeterinarianInfo from './pages/VeterinarianInfo/VeterinarianInfo.js';
import SelectPet from './pages/SelectPet/SelectPet.js';
import AdminServices from './pages/AdminServices/AdminServices.js';
import ProfilePet from './pages/ProfilePet/ProfilePet.js';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/services" element={<Services />} />
      <Route path="/veterinarian-info" element={<VeterinarianInfo />}/>
      <Route path="/your-pet" element={<YourPet />} />
      <Route path="/your-booking" element={<YourBooking />} />
      <Route path="/select-pet" element={<SelectPet />}/>
      <Route path="/booking" element={<Booking />} />

      <Route path="/manage-booking" element={<ManageListBooking />} />
      <Route path='/manage-cages' element={<ManageCages />} />
      
      <Route path="/manage-doctor-calender" element={<ManageDoctorCalender />} />
      <Route path="/work-schedule" element={<WorkSchedule />} />
      <Route path="/sick-pet" element={<ManageSickPet />} />
      <Route path="/pet-exam-record" element={<PetExamRecord />} />
      
      <Route path="/admin-account" element={<AdminAccount />} />
      <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      <Route path="/admin-services" element={<AdminServices />} />
      <Route path="/pet-profile" element={<ProfilePet />} />
    </Routes>
  );
}

export default App;
