# DealsDry-Assignment
#Employee Management System
This project is an Employee Management System built using the MERN stack. It provides functionalities to create, update, delete, and retrieve employee details with a modern, intuitive user interface and a robust backend. The project demonstrates the use of advanced JavaScript frameworks, libraries, and tools.

#Features
CRUD Operations:

#Create new employees.
Update existing employee details.
Delete employees.
Fetch and display employee data in a user-friendly manner.
Field Validations:

Unique email and mobile number validation to prevent duplicates.
Real-time validation for required fields and formatting.
Image Upload:

Employees can upload profile images using Multer, stored in a local directory.
Frontend Integration:

Built using Vite + React, ensuring fast development and optimized builds.
Database:

Cloud-hosted database on MongoDB Atlas, ensuring reliable and scalable data storage.
API Integration:

Frontend communicates with the backend using Axios for seamless API calls.
Real-Time Notifications:

Integrated React Toastify for responsive and user-friendly notifications.

#Cross-Origin Requests:

Configured CORS for secure interaction between frontend and backend.

Project Structure
plaintext
Copy code
my-project/  
├── frontend/       # Contains React-based frontend  
│   ├── src/  
│   │   ├── components/  
│   │   ├── pages/  
│   │   ├── CreateEmployee.jsx  
│   │   └── OtherPages.jsx  
│   └── package.json  
├── backend/        # Contains Node.js + Express backend  
│   ├── index.js    # Main server file with API routes  
│   └── package.json  
└── README.md  

Installation and Setup
Prerequisites:
Ensure you have the following installed on your system:

Node.js
MongoDB Atlas account
Git
Steps to Run the Project:
Clone the Repository:

bash
Copy code
git clone [GitHub Repository URL]  
cd my-project  
Backend Setup:

Navigate to the backend folder:
bash
Copy code
cd backend  
Install dependencies:
bash
Copy code
npm install  
Configure MongoDB Atlas connection in index.js.
Start the server:
bash
Copy code
node index.js  
Frontend Setup:

Navigate to the frontend folder:
bash
Copy code
cd ../frontend  
Install dependencies:
bash
Copy code
npm install  
Start the development server:
bash
Copy code
npm run dev  
Access the Application:

Open your browser and navigate to the frontend server (default: http://localhost:5173).
Technologies Used
Frontend:
React.js
Vite (for fast builds and hot-reloading)
Axios (for HTTP requests)
React Toastify (for notifications)
Backend:
Node.js
Express.js
Multer (for handling file uploads)
CORS (to enable cross-origin requests)
Database:
MongoDB Atlas (cloud-hosted NoSQL database)


Author
[Sachchidanand Gupta]

GitHub: https://github.com/hackwithhuman
LinkedIn: https://www.linkedin.com/in/sachchidanand-gupta/



