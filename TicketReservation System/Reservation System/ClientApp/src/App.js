import React from "react";
import "./custom.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/nav/Home";
import AddUser from "./components/user_management/AddUser";
import UpdateUser from "./components/user_management/UpdateUser";
import AllUsers from "./components/user_management/AllUsers";
import UserLogin from "./components/user_management/UserLogin";
import Header from "./components/nav/Header";
import Footer from "./components/nav/Footer";
import BackofficeUsers from "./components/user_management/BackofficeUsers";
import TravelAgents from "./components/user_management/TravelAgents";
import AllTravelers from "./components/traveler_management/AllTravelers";
import AddTraveler from "./components/traveler_management/AddTraveler";
import UpdateTraveler from "./components/traveler_management/UpdateTraveler";

function App() {
  const location = useLocation();

  const excludedPaths = ["/"];

  const excludeHeaderFooter = excludedPaths.includes(location.pathname);

  return (
    <div>
      {!excludeHeaderFooter && <Header />}
      <Routes>
        <Route path="/" exact element={<UserLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allUsers" element={<AllUsers />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/backofficeUsers" element={<BackofficeUsers />} />
        <Route path="/travelAgents" element={<TravelAgents />} />

        {/* Traveler Routes */}
        <Route path="/allTravelers" element={<AllTravelers />} />
        <Route path="/addTraveler" element={<AddTraveler />} />
        <Route path="/updateTraveler/:nic" element={<UpdateTraveler />} />
      </Routes>
      {!excludeHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
