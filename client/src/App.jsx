import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./components/AdminHome";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import CompanyHome from "./components/CompanyHome";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/CompanyHome" element={<CompanyHome />} />
          <Route path="/UserHome" element={<UserHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
