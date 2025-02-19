import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberSignIn from "./pages/auth/MemberSignIn";
import MemberSignUp from "./pages/auth/MemberSignUp";
import Rules from "./pages/home/rules";
import HomePage from "./pages/home/HomePage";
import LibraryExplorer from "./pages/book/LibraryExplorer";
import Profile from "./userProfile/profile";
import { Toaster } from "react-hot-toast";
import AboutUs from "./pages/home/AboutUs";
import StaffSignIn from "./pages/auth/StaffSignIn";
import ResetPasswordForm from "./pages/auth/ResetPasswordForm";
import {
  UserProtectedRoute,
  Level1ProtectedRoute,
  Level2ProtectedRoute,
  ProtectedRoute,
} from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeProvider";
import Level1Panel from "./adminPanel/Level1Panel";
import BookInfo from "./pages/book/bookInfo";
import Unauthorized from "./pages/Unauthorized";
import Level2Panel from "./adminPanel/Level2Panel";
import BookFilter from "./pages/book/BookFilter";
import FilteredBooks from "./pages/book/FilteredBooks";
import FAQ from "./pages/home/FAQ";
import ResetPassword from "./pages/auth/ResetPassword";
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          <Routes>
            <Route path="/" element={<HomePage libraryName="دانش" />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="faq" element={<FAQ />} />
            <Route
              path="/signup"
              element={
                <ProtectedRoute>
                  <MemberSignUp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <ProtectedRoute>
                  <MemberSignIn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin/resetpassword"
              element={
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staffsignin/resetpassword"
              element={
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updatepassword"
              element={
                <ProtectedRoute>
                  <ResetPasswordForm />
                </ProtectedRoute>
              }
            />
            <Route path="/rules" element={<Rules />} />
            <Route path="/libraryexplorer" element={<LibraryExplorer />} />
            <Route
              path="profile/:user_id"
              element={
                <UserProtectedRoute>
                  <Profile />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/staffsignin"
              element={
                <ProtectedRoute>
                  <StaffSignIn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/level2dasboard/:user_id"
              element={
                <Level2ProtectedRoute>
                  <Level2Panel />
                </Level2ProtectedRoute>
              }
            />
            <Route
              path="/level1dasboard/:user_id"
              element={
                <Level1ProtectedRoute>
                  <Level1Panel />
                </Level1ProtectedRoute>
              }
            />
            <Route path="/bookinfo/:isbn" element={<BookInfo />} />
            <Route path="/libraryexplorer/:table" element={<BookFilter />} />
            <Route
              path="/libraryexplorer/:table/:filter"
              element={<FilteredBooks />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
