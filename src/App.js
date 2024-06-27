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
import AdminCages from './pages/AdminCages/AdminCages.js';
import ProfilePet from './pages/ProfilePet/ProfilePet.js';
import ChoosePet from './pages/ChoosePet/ChoosePet.js';
import Payment from './pages/Payment/Payment.js';
import Unauthorized from './pages/Unauthorized/Unauthorized.js';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute allowedRoles={['Customer']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/unauthorized'
          element={<Unauthorized />}
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
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
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
          element={
            <ProtectedRoute allowedRoles={['Customer']}>
              <YourPet />
            </ProtectedRoute>
          }
        />
        <Route
          path='/your-booking'
          element={
            <ProtectedRoute allowedRoles={['Customer']}>
              <YourBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path='/booking'
          element={
            <ProtectedRoute allowedRoles={['Customer']}>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path='/choose'
          element={
            <ProtectedRoute allowedRoles={['Customer']}>
              <ChoosePet />
            </ProtectedRoute>
          }
        />
        <Route
          path='/pet-profile'
          element={
            <ProtectedRoute allowedRoles={['Customer']}>
              <ProfilePet />
            </ProtectedRoute>
          }
        />
        <Route
          path='/payment'
          element={
            <ProtectedRoute allowedRoles={['Customer']}>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path='/manage-booking'
          element={
            <ProtectedRoute allowedRoles={['Employee']}>
              <ManageListBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path='/manage-cages'
          element={
            <ProtectedRoute allowedRoles={['Employee']}>
              <ManageCages />
            </ProtectedRoute>
          }
        />
        <Route
          path='/work-schedule'
          element={
            <ProtectedRoute>
              <WorkSchedule />
            </ProtectedRoute>
          }
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
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin-dashboard'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin-services'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin-cages'
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminCages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
