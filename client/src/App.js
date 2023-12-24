import "./Firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import PlantUploadForm from "./components/PlantUploadForm";
import NominationForm from "./components/NominationForm";
import UserProfilePage from "./pages/UserProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import NominationPage from "./pages/NominationPage";
import RequireAuth from "./context/RequireAuth";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/upload"
          element={
            <RequireAuth>
              <PlantUploadForm />
            </RequireAuth>
          }
        />
        <Route
          path="/nominate"
          element={
            <RequireAuth>
              <NominationForm />
            </RequireAuth>
          }
        />
        <Route path="/profile" element={
        <RequireAuth>
        <UserProfilePage />
        </RequireAuth>
        } />
        <Route path="/edit" element={
        <RequireAuth>
        <EditProfilePage />
        </RequireAuth>
        } />
        <Route path="/nominations" element={
        <RequireAuth>
        <NominationPage />
        </RequireAuth>
        } />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
