const express = require("express");
const bcrypt = require("bcryptjs")
const laboratory = require("../Modules/laboratorySchema");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("=====================================", req.body)
  if (!name || !email || !password || !role) {
    res.status(401).json({
      error: true,
      message: "Fill the Registration form properly",
      data: null,
    });
  }
  else {
    try {
      const emailExists = await laboratory.findOne({ email: email }).lean();
      console.log("emailExists", emailExists)
      if (!emailExists) {
        console.log("in fif")
        const saltround = 10
        //Creating Salt
        const salt = await bcrypt.genSalt(saltround)
        //Encrypting Password
        const hashPassword = await bcrypt.hash(password, salt)
        //Updating Registered Data in DB
        const newUser = new laboratory({
          name,
          email,
          password: hashPassword,
          role,
          status: false,
        });
        newUser.save().then(() => {
          res.status(200).json({
            error: false,
            message: "Registration Successfull",
            data: null,
          });
        });
      } else {
        res.status(200).json({
          error: true,
          message: "User already exist",
          data: null,
        });
      }
    } catch (err) {
      res.status(200).json({
        error: true,
        message: "Registration Failed!",
        data: null,
      });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(401).json({
      error: true,
      message: "Fill the Login form properly",
      data: null,
    });
  } else {
    try {
      const userData = await laboratory.findOne({ email: email }).lean();
      if (userData) {
        let { name, role } = userData
        const isPasswordMatch = await bcrypt.compare(password, userData.password)
        console.log(isPasswordMatch);
        if (isPasswordMatch) {
          token = jwt.sign({ name: name, role: role }, process.env.SECRET_KEY, {
            expiresIn: "1h"
          });
          res.status(200).json({
            error: false,
            message: "Login Successfull...!",
            data: {
              name, role, token
            }
          });
        } else {
          res.status(200).json({
            error: true,
            message: "Invalid Password...!",
            data: null,
          });
        }
      } else {
        res.status(200).json({
          error: true,
          message: "User not registered...!",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const getUserRecords = async (req, res) => {
  const { _id, name, date, email } = req.body;

  try {
    const allUsers = await laboratory.find({ role: 'user' }).lean()
    res.json({
      error: false,
      message: "Data Recieved",
      data: allUsers
    })

  } catch (error) {
    console.log(error);
  }
};

const getCreateTest = async (req, res) => {
  try {
    // const testData = await laboratory.find({});
    const testData = await laboratory.find({role: 'user'})
    res.send(testData);
  } catch (error) {
    console.log(error);
  }
};

const postCreatetest = async (req, res) => {
  const { selectedUserFromList, isHeamatology, isThyroid, isGlucometry } = req.body;
  const status = { isHeamatology, isThyroid, isGlucometry };

  await laboratory.updateOne(
    { _id: selectedUserFromList },
    { $set: { test: true } }
  );
  await laboratory.updateOne(
    { _id: selectedUserFromList },
    { $set: { status: status } }
  );
  res.send(req.body);
};

const postHeamatology = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    const { id, haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv } = req.body;
    const heamatology = { haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv, };
    await laboratory.updateOne(
      { _id: id },
      { $set: { heamatology: heamatology, test: true } }
    );
    res.status(200).json({
      error: false,
      message: "Report Added Successfully...!",
      data: null
    })
  } else {
    res.status(200).json({
      error: false,
      message: "Fill the Report Properly...!",
      data: null
    })
  }
};

const postThyroid = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    const { id, tri, tsh, thyroxine } = req.body;
    const thyroid = { tri, tsh, thyroxine };

    await laboratory.updateOne(
      { _id: id },
      { $set: { thyroid: thyroid, test: true } }
    );
    res.status(200).json({
      error: false,
      message: "Report Added Successfully...!",
      data: null
    })
  } else {
    res.status(200).json({
      error: false,
      message: "Fill the Report Properly...!",
      data: null
    })
  }
};

const putThyroidData = async (req, res) => {
  console.log(req.body)
  const { tri, tsh, thyroxine, id } = req.body;
  const thyroid = { tri, tsh, thyroxine };

  await laboratory.updateOne(
    { _id: id },
    { $set: { thyroid: thyroid } }
  );
  res.status(200).json({
    error: false,
    message: "Report Added Successfully...!",
    data: null
  })
}

const postGlucometry = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    const { id, fbs, ppbs, gh, calcium } = req.body;
    const glucometry = { fbs, ppbs, gh, calcium };
    await laboratory.updateOne(
      { _id: id },
      { $set: { glucometry: glucometry, test: true } }
    );
    res.status(200).json({
      error: false,
      message: "Report Added Successfully...!",
      data: null
    })
  } else {
    res.status(200).json({
      error: false,
      message: "Fill the Report Properly...!",
      data: null
    })
  }

};

module.exports = {
  register,
  login,
  getUserRecords,
  getCreateTest,
  postCreatetest,
  postHeamatology,
  postThyroid,
  putThyroidData,
  postGlucometry,
};
