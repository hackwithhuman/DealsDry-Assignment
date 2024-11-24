const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, match: /^[0-9]{10}$/ },
  designation: { type: String, required: true, enum: ['HR', 'Manager', 'Sales'] },
  gender: { type: String, required: true, enum: ['M', 'F'] },
  course: { type: [String], enum: ['MCA', 'BCA', 'BSC'], validate: [arrayLimit] },
  imgUpload: { type: String, required: true },
  
},
{ timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Custom validator for courses
function arrayLimit(val) {
  return val.length > 0;
}



module.exports =  User = mongoose.model('User', userSchema);


