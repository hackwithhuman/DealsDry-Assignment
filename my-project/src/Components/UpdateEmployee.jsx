import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEmployee = () => {
  const { id } = useParams(); // Get the ID from the route
  const navigate = useNavigate(); // To redirect after successful update
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });

  // Fetch employee details
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/update-employee/${id}`);
      if (response.status === 200) {
        setEmployee(response.data.employee); // Populate the form with fetched data
      }
    } catch (error) {
      console.error("Error fetching employee data:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setEmployee((prev) => ({
        ...prev,
        course: checked ? [...prev.course, value] : prev.course.filter((course) => course !== value), // Remove unchecked course
      }));
    } else if (name === "image") {
      setEmployee((prev) => ({
        ...prev,
        image: e.target.files[0], // Handle file upload
      }));
    } else {
      setEmployee((prev) => ({
        ...prev,
        [name]: value, // Update other fields
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form data
    Object.keys(employee).forEach((key) => {
      if (key === "course") {
        employee[key].forEach((course) => formData.append("course", course));
      } else {
        formData.append(key, employee[key]);
      }
    });

    try {
      const response = await axios.put(`http://localhost:5050/update-employee/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        toast.success("Employee Updated successfully!!")
        navigate("/employee-list"); // Redirect to employee list page
      }
    } catch (error) {
      console.error("Error updating employee:", error.message);
     toast.error("Employee Update Failed");
    }
  };

  return (
    <div className="mt-40 flex justify-center">
      <div className="w-1/2 mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Update Employee</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
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
              value={employee.email}
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
              name="mobileNo"
              value={employee.mobileNo}
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
              value={employee.designation}
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
                  checked={employee.gender === "M"}
                  onChange={handleChange}
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={employee.gender === "F"}
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
              {["MCA", "BCA", "BSC"].map((course) => (
                <label key={course} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="course"
                    value={course}
                    checked={employee.course.includes(course)}
                    onChange={handleChange}
                  />
                  <span>{course}</span>
                </label>
              ))}
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
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 btn btn-success text-white"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
