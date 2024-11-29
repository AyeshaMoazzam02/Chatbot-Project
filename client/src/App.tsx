import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { FilesUploadPage, ForgotPasswordPage, PageNotFound, SignInPage, SignUpPage } from "./pages";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/files-upload" element={<FilesUploadPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Router>
  )
}

export default App
