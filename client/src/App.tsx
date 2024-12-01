import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss'
import { ChatbotPage, FilesUploadPage, ForgotPasswordPage, PageNotFound, ResetPasswordPage, SignInPage, SignUpPage } from "./pages";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/files-upload" element={<FilesUploadPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
