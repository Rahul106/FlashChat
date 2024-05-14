const Sequelize = require('sequelize');
const { Op } = Sequelize;
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { isNotValidInput } = require('../utils/validation');





exports.uploadProfilePicture= async(req, res, next) => {

  console.log('Current-User-Id : ', req.user.id);

  const imgLocation = req.body.profilePicture; 
  console.log('Profile-Picture : ' +imgLocation);

  try {

    const [updatedCount, updatedUser] = await User.update(
      { imgpath: imgLocation },
      { 
        where: { id: req.user.id },
        returning: true
      }
    );

    if (updatedUser > 0) {
      const updatedUser = await User.findOne({ where: { id: req.user.id } });
      res.status(200).json({ message: "Profile picture updated successfully", user: updatedUser });
    } else {
      res.status(400).json({ message: "Failed to update profile picture" });
    }

  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}




exports.getAllUsersWithStatus= async(req, res, next) => {
  
  try {
    
    const users = await User.findAll({
      attributes: ['id', 'name', 'imgpath', 'status'],
      where: {
        id: {
          [Sequelize.Op.not]: req.user.id
        }
      }
    });
   
    const userNameAndStatus = users.map(user => ({
      id: user.id,
      name: user.name,
      imgpath: user.imgpath,
      status: user.status
    }));

    if (userNameAndStatus.length === 0) {
      return res.status(404).json({ status: 'failed', message: 'No users found', data: null });
    } else {
      return res.status(200).json({ status: 'success', message: 'Users found', data: userNameAndStatus });
    }
  
  } catch (error) {
    throw new Error('Error fetching usernames: ' + error.message);
  }

}




//* - function to fetch current user information
exports.getCurrentUserInfo = async(req, res, next) => {

  console.log('-----Request-User-Info------');

  try {
     
    console.log('User-Id : ' +req.user.id);

    const userDetails = await User.findOne({
      attributes: ['id', 'name', 'email', 'phone', 'imgpath'],
      where: {
        id: req.user.id
      }
    });

    if (userDetails) {

      console.log('------User Found Successfull-------' +userDetails);

      return res
      .status(200)
      .json({
        status: "success",
        message: "User found successfull",
        data: {
          userId : userDetails.id,
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          imgpath: userDetails.imgpath
        },
      });

    } else {

      console.log('------User Not Found -------')

      return res
      .status(404)
      .json({ 
        status: "Failed", 
        message: "User not found"
     });

    }

  } catch(error) {
  
    console.error("Error in fetching current user: " +error.message);
    
    return res
        .status(500)
        .json({ 
          status: "Failed-Error", 
          message: "Error-Failed to Found User" 
        });

  } 

}




//* - function to handles user authentication
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
          User.update({ status: 'online' }, { where: { id: user.id } });
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






exports.logoutUser = async(req, res) => {

  try {
    await User.update({ status: 'offline' }, { where: { id: req.user.id } });
    return res.status(200).json({ message: 'User logged out successfully', success: true });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'User logged out successfully - Technical Error.', success: false });
  }
  
    
}






//* - function to creates a new user
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