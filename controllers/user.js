const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { isNotValidInput } = require('../utils/validation');
const { Sequelize } = require('sequelize');




//* - signin(authenticatation) Controller
exports.authenticateUser = async(req, res, next) => {

  const { email, password } = req.body;

  try {

    if(isNotValidInput(email)) {
        return res.status(400).json({ message: 'email is not present. kindly fill the email' , success: false });
    }
    
    if(isNotValidInput(password)) {
      return res.status(400).json({ message: 'password is not present. kindly fill the password', success: false});
    }

    const user = await User.findOne({ where: { email } });
    
    if(user) {
      
      bcrypt.compare(password, user.password, (hasherr, hashresponse) => {

        if(hasherr) {
          throw new Error("Something went wrong in authentication");
        }
       
        if(hashresponse) {
          const token = generateAccessToken(user.id, user.name);
          return res.status(200).json({message: 'User logged in successfully', success: true, token : token, data: user});
        } else {
          res.status(401).json({ message: 'User not authorized. Password Incorrect.' , success: false });
        }

      });

    } else {
        return res.status(404).json({ message: 'User not found/exists' });
    }
    
  } catch (error) {

    return res.status(500).json({ message:error });
  
  }
  
};




//* - signup page controller
exports.createNewUser = async(req, res) => {
    
  try {
    
    const { name, email, phone, password } = req.body;
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);

    if(isNotValidInput(name)) {
      return res.status(400).json({ message: 'name is not present. kindly fill the name' });
    } else if (isNotValidInput(email)) {
      return res.status(400).json({ message: 'email is not present. kindly fill the email' });
    } else if (isNotValidInput(phone)) {
      return res.status(400).json({ message: 'phone is not present. kindly fill the phone' });
    } else if (isNotValidInput(password)) {
      return res.status(400).json({ message: 'password is not present. kindly fill the password' });
    }

    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "User with this email already exists. Please use a different email." });
    }
    
    const existingUserByPhone = await User.findOne({ where: { phone } });
    if (existingUserByPhone) {
        return res.status(409).json({ message: "User with this phone number already exists. Please use a different phone number." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });
        
    return res.status(201).json({ userAddedResponse: "Successfuly created new user.!" });

  } catch(error) {
     
    return res.status(500).json({ message: error.message || "Internal Server Error" });

  }
    
};




//* - methods generates JWT with id and name
const generateAccessToken = (id, name) => {

  return jwt.sign({id:id, name:name}, process.env.JWT_SECRET_KEY);

}