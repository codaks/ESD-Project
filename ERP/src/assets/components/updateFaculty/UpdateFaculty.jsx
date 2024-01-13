
import DropdownMenu from '../Dropdown/dropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './UpdateFaculty.css';

const FacultyProfile = () => {

    const [profileData, setProfileData] = useState({
        id: "",
        access_token: "",
        first_name: "",
        last_name: "",
        title: "",
        email: "",
        path: "",
        department: ""
    });

    const [satus,SetStatus] = useState("");

    const [image, setImage] = useState({
        selectedFiles: undefined,
        currentFile: undefined,
        progress: 0,
        message: "",
    });

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        console.log("This is image: ", e.target.files[0])
    };


    const changeProfileData = (e) => {
        // console.log(name,"  ",value)
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            const facultyId = localStorage.getItem('id');
            const accessToken = localStorage.getItem('access_token');
            console.log(facultyId, " ", accessToken)
            if (facultyId == "" && accessToken == "") {
                console.log("Condition true")
                navigate('/login');
                return;
            }
            // console.log(facultyId,accessToken);
            try {
                const response = await axios.get(`/api/v1/employee/employee/${facultyId}`, {
                    headers: {
                        "access-control-allow-origin": "*",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("The Response the data ", response.data)
                setProfileData({
                    ...profileData,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    title: response.data.title,
                    email: response.data.email,
                    path: response.data.photographPath,
                    department: "CSE",
                    id: facultyId,
                    access_token: accessToken,

                });
                console.log("Here I want to print title ", profileData.title)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [navigate]); // Empty dependency array triggers the effect only once on mount

    // if(profileData.id==null)


    const handleEmployeeUpdate = async (e) => {
        const accessToken = localStorage.getItem('access_token');
        e.preventDefault();
        try {
            // console.log(username, password);
            console.log(accessToken)
            const response = await axios({

                method: 'post',
                url: `/api/v1/employee/updateFaculty`,

                data: {
                    "email": profileData.email,
                    "id": profileData.id,
                    "first_name": profileData.first_name,
                    "last_name": profileData.last_name,
                    "title": profileData.title
                },
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${accessToken}`,
                },
            });


            SetStatus("Your Profile Has Been Updated Successfully")
            navigate('/profile');


            // Redirect or perform actions upon successful login
        } catch (error) {
            console.error('Registration Failed:', error);
            SetStatus("")
        }

    };




    return (
        <form onSubmit={handleEmployeeUpdate} id='update-form'>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src="src/assets/images/3.jfif" alt="Profile" />
                            <span className="font-weight-bold">{profileData.first_name} {profileData.last_name}</span>
                            <span className="text-black-50">{profileData.email}</span>
                        </div>
                    </div>
                    <div className="col-md-9 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-4">
                                    <label className="labels">Name</label>
                                    <input
                                        name="first_name"
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={profileData.first_name}
                                        onChange={changeProfileData} />
                                </div>
                                <div className="col-md-4">
                                    <label className="labels">Surname</label>
                                    <input
                                        name="last_name"
                                        type="text"
                                        className="form-control"
                                        value={profileData.last_name}
                                        placeholder="Surname"
                                        onChange={changeProfileData} />
                                </div>
                                <div className="col-md-4">
                                    <label className="labels">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="Title"
                                        value={profileData.title}
                                        onChange={changeProfileData} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={profileData.email}
                                        onChange={changeProfileData} />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Image</label>
                                    <div className="mb-3">
                                        <input className="form-control" type="file" id="formFile" accept="image/*" onChange={handleFileChange} />
                                    </div>
                                </div>

                            </div>
                            {/* Other input fields */}
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                        </div>
                    </div>
                    <div className = "row">
                        <div className='status' >{satus}</div>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default FacultyProfile;

