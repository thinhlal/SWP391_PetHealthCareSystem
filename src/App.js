// import { Routes, Route, Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicRoute from './components/HandleRoutes/PublicRoute.js';
import ProtectedRoute from './components/HandleRoutes/ProtectedRoute.js';
//Component
import Booking from './pages/Booking/Booking.js';
import Home from './pages/Home/Home.js';
import SignUp from './pages/SignUp/SignUp.js';
import ManageListBooking from './pages/ManageBooking/ManageListBooking.js';
import YourPet from './pages/YourPet/YourPet.js';
import Services from './pages/Services/Services.js';
import Login from './pages/Login/Login.js';
import ManageCages from './pages/ManageCages/ManageCages.js';
import WorkSchedule from './pages/WorkSchedule/WorkSchedule.js';
import AdminDashBoard from './pages/AdminDashBoard/AdminDashBoard.js';
import ManageSickPet from './pages/ManageSickPet/ManageSickPet.js';
import YourBooking from './pages/YourBooking/YourBooking.js';
import AdminAccount from './pages/AdminAccount/AdminAccount.js';
import PetExamRecord from './pages/PetExamRecord/PetExamRecord.js';
import VeterinarianInfo from './pages/VeterinarianInfo/VeterinarianInfo.js';
import AdminServices from './pages/AdminServices/AdminServices.js';
import ProfilePet from './pages/ProfilePet/ProfilePet.js';
import ChoosePet from './pages/ChoosePet/ChoosePet.js';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/services'
          element={<Services />}
        />
        <Route
          path='/veterinarian-info'
          element={<VeterinarianInfo />}
        />
        <Route
          path='/your-pet'
          element={<YourPet />}
        />
        <Route
          path='/your-booking'
          element={<YourBooking />}
        />
        <Route
          path='/booking'
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path='/choose'
          element={
            <ProtectedRoute>
              <ChoosePet />
            </ProtectedRoute>
          }
        />
        <Route
          path='/pet-profile'
          element={<ProfilePet />}
        />

        <Route
          path='/manage-booking'
          element={<ManageListBooking />}
        />
        <Route
          path='/manage-cages'
          element={<ManageCages />}
        />
        <Route
          path='/work-schedule'
          element={<WorkSchedule />}
        />
        <Route
          path='/sick-pet'
          element={<ManageSickPet />}
        />
        <Route
          path='/pet-exam-record'
          element={<PetExamRecord />}
        />

        <Route
          path='/admin-account'
          element={<AdminAccount />}
        />
        <Route
          path='/admin-dashboard'
          element={<AdminDashBoard />}
        />
        <Route
          path='/admin-services'
          element={<AdminServices />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
