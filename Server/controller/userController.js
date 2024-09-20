const express = require('express');
const bcrypt = require('bcryptjs')
const User = require("../model/userModel");

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //CHECKS FOR EXISTENCE
    if (await User.findOne({ email })) {
      return res.status(400).send("User already Exists!");
    }

    //HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //CREATE A NEW USER
    await User.create({
        name, email, password: hashedPassword
    });

    return res.status(200).json({
        Status:'Success',
    })
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //GET USER DETAILS
    const userDetails = await User.findOne({email});
    if (!userDetails) return res.status(404).send('user not exists');

    //PASSWORD CHECK
    const isPasswordValid = await bcrypt.compare(password, userDetails.password);
    if(!isPasswordValid) return res.status(401).send('wrong password');

    res.status(200).json({
      status: "Success",
      Login: true,
    });

  } catch (e) {
    res.send(500).json({message: e.message});
  }
}

module.exports = { RegisterUser, Login };
