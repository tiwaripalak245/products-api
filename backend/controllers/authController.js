const bcrypt = require("bcrypt");
const createToken = require("../service/tokenProvider");
const { response } = require("express");
const Auth = require("../models/authModel");

const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const userEmail = await Auth.findOne({ email: email });

  if (userEmail) {
    res.send({ staus: "ok", message: "user already registered" });
  } else {
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const hashPassword = await bcrypt.hash(password, 10);
          const user = new Auth({
            name: name,
            email: email,
            password: hashPassword,
          });

          const doc = await user.save();
          const getUser = await Auth.findOne({ email: email });
          const token = createToken(getUser);
          // res.cookie("token", token, { Httponly: true });
          res.send({
            staus: "ok",
            message: "user registered successfully!!",
            token: token
          });
        } catch (error) {
          res.send(error);
        }
      } else {
        res.send({ staus: "ok", message: "Please enter valid password!!" });
      }
    } else {
      res.send({ staus: "ok", message: "Please fill all the details!!" });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const userEmail = await Auth.findOne({ email: email });

    if (userEmail) {
      const isMatch = await bcrypt.compare(password, userEmail.password);

      if (userEmail.email === email && isMatch) {
        const getUser = await Auth.findOne({ email: email });
        const token = createToken(getUser);
        console.log(token);
        res.send({ staus: "ok", message: "loggin successfully", token: token });
      } else {
        res.send({ staus: "ok", message: "Invalid details" });
      }
    } else {
      res.send({ staus: "ok", message: "user not registered" });
    }
  } else {
    res.send({ staus: "ok", message: "please fill all the details" });
  }
};

const changePassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      res.send({ message: "Please enter valid password" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const savedPassword = await Auth.findByIdAndUpdate(req.user._id, {
        $set: { password: hashPassword },
      });
      res.send({ message: "Password changed successfully" });
    }
  } else {
    res.send({ message: "Please fill all the details" });
  }
};

const loggedUser = (req, res) => {
  res.send(req.user);
};

module.exports = { registerUser, loginUser, changePassword, loggedUser };
