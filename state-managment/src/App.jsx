import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddPage from "./pages/Addpage";
import Story from "./pages/story";
import EditPage from "./pages/EditPage";
import Register from "./pages/register";
import Login from "./pages/login"; // Ensure this matches your file name capitalization

export default function App() {
  return (
    <Routes>
      {/* 1. If a user lands on the blank root "/", automatically bounce them to registration */}
      <Route path="/" element={<Navigate to="/register" replace />} />
      
      {/* 2. Public Registration Route with the fixed uppercase component tag */}
      <Route path="/register" element={<Register />} />
      {/*  2. Add your new independent Login Route path right here */}
      <Route path="/login" element={<Login />} />
      
      {/* 3. Core application paths */}
      <Route path="/home" element={<Home />} />
      <Route path="/add" element={<AddPage />} />
      <Route path="/story/:id" element={<Story />} />
      <Route path="/edit/:id" element={<EditPage />} />
    </Routes>
  );
}
