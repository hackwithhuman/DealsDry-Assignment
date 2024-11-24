import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all employees or search based on the query
  const fetchEmployees = async (query = '') => {
    try {
      const response = await axios.get('http://localhost:5050/employee-list', {
        params: { search: query },
      });
      if (response.status === 200) {
        setEmployees(response.data.employeeList);
      } else {
        toast.error('Failed to fetch employees.');
      }
    } catch (err) {
    //   toast.error(err.message);
    toast.error("No such Employee found ");
    }
  };

  useEffect(() => {
    fetchEmployees(); // Fetch all employees initially
  }, []);

  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5050/employee/${id}`);
      toast.success(response.data.message);
      fetchEmployees(); // Refresh the list after deletion
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Handle the search
  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (searchQuery.trim() === '') {
      fetchEmployees(); 
    } else {
      fetchEmployees(searchQuery.trim()); // Fetch employees based on the search query
    }
  };

  return (
    <>
      <div className="mt-32 p-2 text-gray-600 bg-blue-200">
        <div>
          <p className="text-2xl">Employees List</p>
        </div>

        <div className="flex justify-end gap-2 mx-0 my-0">
          <a
            href="/create-employee"
            className="style-none text-xl text-gray-700 top-0 mx-0"
          >
            Create Employee
          </a>
          <p className="text-center mx-4">Total count = {employees.length}</p>
        </div>

        <form onSubmit={handleSearch} className="flex justify-end">
          <input
            type="text"
            className="mx-2 input input-bordered"
            placeholder="Enter Search Keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-success text-white">
            Search
          </button>
        </form>
      </div>

      <div className="mt-4 flex justify-center h-[600px]">
        <div className="overflow-x-auto overflow-scroll p-3">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>
                      <img
                        src={`http://localhost:5050${employee.imgUpload}`}
                        alt={employee.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobileNo}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                    <td>{employee.course.join(', ')}</td>
                    <td>{formatDate(employee.createdAt)}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-error text-white"
                        onClick={() => deleteEmployee(employee._id)}
                      >
                        Delete
                      </button>
                      <button className="btn btn-accent text-slate-200 mx-2">
                        <a href={`/update-employee/${employee._id}`}>Edit</a>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No Employee Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
