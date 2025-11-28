import sendMail from "../middlewares/sendMail.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

console.log("Jwt_sec😡",process.env.Jwt_sec)
export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
     console.log("this is the email 🍄",email)
    let user = await User.findOne({ email });
     console.log("this is the user",user)
    if (!user) {
      user = await User.create({
        email,
      });
    }

    const otp = Math.floor(Math.random() * 1000000);
    
    const verifyToken = jwt.sign({ user, otp }, process.env.Activation_sec, {
      expiresIn: "5m",
    });
    console.log('this is verify token❤️‍🔥',verifyToken);
    try {
      await sendMail(email, "ChatBot", otp);
    } catch (error) {
         return res.status(500).json({msg:"fail to send error"})
    }
    
    
    res.json({
      message: "Otp send to your mail",
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;
    console.log('details during veficaitoin📍',otp,verifyToken,)

    const verify = jwt.verify(verifyToken, process.env.Activation_sec);

    console.log("during verify",verify)

    if (!verify)
      return res.status(400).json({
        message: "Otp Expired",
      });

    if (verify.otp !== otp)
      return res.status(400).json({
        message: "Wrong otp",
      });

    const token = jwt.sign({ _id: verify.user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    res.json({
      message: "Logged in successfully",
      user: verify.user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
