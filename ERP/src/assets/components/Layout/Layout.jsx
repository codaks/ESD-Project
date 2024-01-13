import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import UpdateCourseDetails from "../UpdateCourseDetails/UpdateCourseDetails";
import UpdateFaculty from "../updateFaculty/UpdateFaculty";
import Login from "../Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Logout from "../logout";

function Layout() {

    return (
        <>
            <NavBar />
            {/* <Login/> */}
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="profile" element={<UpdateFaculty />} />
                    <Route path="coursesdetails" element={<UpdateCourseDetails />} />
                    <Route path="logout" element={<Logout />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Layout;