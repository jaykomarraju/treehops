import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import PlantUploadForm from './components/PlantUploadForm';
import NominationForm from './components/NominationForm';
import UserProfilePage from './pages/UserProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import NominationPage from './pages/NominationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<PlantUploadForm />} />
        <Route path="/nominate" element={<NominationForm />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/edit" element={<EditProfilePage />} />
        <Route path="/nominations" element={<NominationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
