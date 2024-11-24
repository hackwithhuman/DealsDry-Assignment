import React, { useState } from 'react';
import axios from 'axios';
// import toast from "react-toastify";
import { useNavigate , Navigate } from 'react-router-dom';
import { toast } from "react-toastify";


const CreateEmployee = () => {
  const Navigate= useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });


  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        courses: checked ? [...prev.courses, value] : prev.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length < 10) {
      toast.error("Mobile number must be at least 10 digits");
      return; 
    }

     // Email existence check (make a GET request to check if the email exists)
  try {
    const emailCheckResponse = await axios.get(`http://localhost:5050/employee/check-email?email=${formData.email}`);
    if (emailCheckResponse.data.exists) {
      toast.error("Email already exists");
      return; // Stop the submission
    }
  } catch (error) {
    console.error("Error checking email:", error);
    toast.error("Error checking email");
    return; // Stop the submission
  }

  
    // Useing FormData object to prepare the submission
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('mobileNo', formData.mobile); 
    data.append('designation', formData.designation);
    data.append('gender', formData.gender);

    // Appending each course individually to handle arrays properly
    formData.courses.forEach((course) => data.append('course', course));

    // Attach the image file
    data.append('image', formData.image);

    try {
      // Make POST request to the backend
      const response = await axios.post('http://localhost:5050/employee/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure this header is set
        },
      });
      console.log(response);
      toast.success("Employee Registerd successfully");
      // Show success message
    } catch (err) {
      
      toast.error(err.message); 
    }

    Navigate('/employee-list'); 
  };



  return (
    <>
      <div className="mt-40 flex justify-center">
        <div className="w-1/2 mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Create Employee</h2>


          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 input-bordered input"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 input-bordered input"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Mobile No */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Mobile No</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 input-bordered input"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Designation</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-4 py-2 input-bordered input"
                required
              >
                <option value="" disabled>
                  Select Designation
                </option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Gender</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    onChange={handleChange}
                    required
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Courses */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Courses</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="courses"
                    value="MCA"
                    onChange={handleChange}
                  />
                  <span>MCA</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="courses"
                    value="BCA"
                    onChange={handleChange}
                  />
                  <span>BCA</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="courses"
                    value="BSC"
                    onChange={handleChange}
                  />
                  <span>BSC</span>
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:bg-blue-50"
                accept="image/*"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 btn btn-success text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
