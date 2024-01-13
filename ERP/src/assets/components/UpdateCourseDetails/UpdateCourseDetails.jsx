
import React, { useState, useEffect } from 'react';
import './UpdateCourseDetails.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UpdateCourseDetails = () => {
    
    const [courseData, setCourseData] = useState([{
        id: "",
        course_code: "",
        name: "",
        description: "",
        year: "",
        term: "",
        credits: "",
        capcity: ""
    }]);


    const [courseIndex, setCourseIndex] = useState(0)
    const [alertText, setalertText] = useState("")
    const [sucessText, setSucessText] = useState("")
    
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
                const response = await axios.get(`/api/v1/courses/courses/${facultyId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                
                setCourseData(response.data)
                
                console.log("The Hook Data: ", courseData);
                
            } catch (error) {
                setalertText("No Record Found")
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [navigate]); // Empty dependency array triggers the effect only once on mount


    const handleFieldChange = (index, fieldName, value) => {
        const updatedCourses = [...courseData];
        updatedCourses[index] = { ...updatedCourses[index], [fieldName]: value };
        setCourseData(updatedCourses);
    };


    const handleCourseUpdate = async (e) => {
        const accessToken = localStorage.getItem('access_token');
        const facultyID = localStorage.getItem('access_token');
        e.preventDefault();
        try {
            // console.log(username, password);
            console.log(accessToken)

            console.log("Course Data is here  in hange Course Update :",courseData[courseIndex])
            const response = await axios({
                method: 'post',
                url: `/api/v1/courses/updateCourse`,
                data: courseData[courseIndex],
                headers: {
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log(response.data)
            setalertText("")
            setSucessText("Successfully Course "+courseData[courseIndex].course_code+" Updated ")
            navigate('/coursesdetails');

            
            // Redirect or perform actions upon successful login
        } catch (error) {
            setalertText("Course Code Aready Exists")
            console.error('Registration Failed:', error);
        }

    };

    return (
        <>
            <form onSubmit={handleCourseUpdate} id='course-update-form'>

                

                <div className="container rounded bg-white mt-5 mb-5">
                    <div className='row'>
                    <div className='row'>
                        {sucessText}
                    </div>
                    </div>
                    <div className="row">
                        
                        <div className="col-md-9 border-right">
                            <div className="alert-text">
                                {alertText}
                            </div>
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Course Details</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className="labels">Course Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Course Code"
                                            name="course_code"
                                            onChange={(e) => handleFieldChange(courseIndex, 'course_code', e.target.value)}
                                            value={courseData[courseIndex].course_code} required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Course Name"
                                            name="name"
                                            onChange={(e) => handleFieldChange(courseIndex, 'name', e.target.value)}
                                            value={courseData[courseIndex].name} required />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-2">
                                        
                                        <label className="labels">Credits</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Credits"
                                            name="credits"
                                            onChange={(e) => handleFieldChange(courseIndex, 'credits', e.target.value)}
                                            value={courseData[courseIndex].credits} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="labels">Term</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Term"
                                            name="term"
                                            onChange={(e) => handleFieldChange(courseIndex, 'term', e.target.value)}
                                            value={courseData[courseIndex].term} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="labels">Year</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Course Name"
                                            name="year"
                                            onChange={(e) => handleFieldChange(courseIndex, 'year', e.target.value)}
                                            value={courseData[courseIndex].year} required />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="labels">Capacity</label>
                                        <input
                                            type="text"
                                            className="form-control" p
                                            laceholder="Capacity"
                                            name="capcity"
                                            onChange={(e) => handleFieldChange(courseIndex, 'capcity', e.target.value)}
                                            value={courseData[courseIndex].capcity} required /></div>
                                    <div className="col-md-12">
                                        <label className="labels">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Descriptiion"
                                            name="description"
                                            onChange={(e) => handleFieldChange(courseIndex, 'description', e.target.value)}
                                            value={courseData[courseIndex].description} required />
                                    </div>
                                </div>
                                {/* Other input fields */}
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Details</button></div>
                            </div>
                        </div>
                        <div className="col-md-3 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Course List</h4>
                                </div>
                                <div className="col-md-12">
                                    <ul className="list-group">
                                        {courseData.map((item, index) => (
                                            <li className="list-group-item" name={index} onClick={(e) => setCourseIndex(index)}>
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{item.course_code}</div>
                                                    {item.name}
                                                </div>
                                            </li>
                                        ))}


                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>
                    
                </div>
            </form>
        </>
    );
};

export default UpdateCourseDetails;
