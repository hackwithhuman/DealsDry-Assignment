const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require('bcrypt');
const User = require("./models/user.js"); // Ensure correct model path
const cors = require("cors");
const path = require("path");
const Admin = require("./models/Admin.js");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome Back");
});

// Admin resgitration for test 

// app.post("/admin-register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     // Check if the username or password are missing
//     if (!username || !password) {
//       return res.status(400).json({ message: "Username or password missing" });
//     }

//     console.log('Received:', username, password);
//     // Hashing password using bcrypt
//     const saltRounds = 10; // Define the cost factor
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create a new admin instance
//     const RegesteredAdmin = new Admin({
//       username: username,
//       password: hashedPassword,
//     });

//     // Save the admin to the database
//     const savedAdmin = await RegesteredAdmin.save();
//     res.status(201).json({ message: "Registered Successfully", savedAdmin });

//   } catch (error) {
//     console.log("Error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Admin Login ---->>>>>
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ username: admin.username, _id: admin._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads/images");
    cb(null, uploadPath); // Ensure 'uploads/images' exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Create unique file names
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// User Register Route
app.post("/employee/register", upload.single("image"), async (req, res) => {
  try {
    const { name, email, mobileNo, designation, gender, course } = req.body;

    // Validate required fields
    if (!name || !email || !mobileNo || !designation || !gender || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course: Array.isArray(course) ? course : [course], // Ensure course is an array
      imgUpload: `/uploads/images/${req.file.filename}`, // Save relative path
    });

    // Save user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});


// email checking
app.get('/employee/check-email', async (req, res) => {
  const { email } = req.query;
  
  // Check if email exists in the database
  const user = await User.findOne({ email });
  
  if (user) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
});


// Searching functionality and fetching employee list
app.get("/employee-list", async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobileNo: { $regex: search, $options: "i" } },
      ],
    };
  }

  try {
    // If no search query, find all employees, otherwise use the search query
    const employeeList = await User.find(query);
    
    if (employeeList.length > 0) {
      res.status(200).json({ employeeList });
    } else {
      res.status(404).json({ message: "No employees found" });
    }
  } catch (error) {
    console.error("Error fetching employee list:", error.message);
    res.status(500).json({ message: "Failed to fetch employees", error: error.message });
  }
});


// Delete an employee 

app.delete("/employee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await User.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully", employee: deletedEmployee });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get employee details for updating (existing employee data)
app.get("/update-employee/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await User.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.error("Error fetching employee:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update employee route
app.put("/update-employee/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;

  try {
    
    const employee = await User.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    
    const { name, email, mobileNo, designation, gender, course } = req.body;

    
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (mobileNo) employee.mobileNo = mobileNo;
    if (designation) employee.designation = designation;
    if (gender) employee.gender = gender;
    
    
    if (course) {
      employee.course = Array.isArray(course) ? course : [course]; 
    }

    
    if (req.file) {
      employee.imgUpload = req.file.path; 
    }
    const updatedEmployee = await employee.save();
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});





// MongoDB Connection
MONGO_URI = "mongodb+srv://digitalsudama076:4TnbTQ0d0yBaV1o0@cluster0.pd3yn.mongodb.net/"

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Start Server
app.listen(5050, () => {
  console.log("Server is listening on Port 5050");
});
