import { User } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "5d",
  });
};

export const register = async (req, res) => {
  const { firstname, lastname, email, password, confirmPass, gender } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !confirmPass ||
    !gender
  ) {
    return res.status(401).json({ message: "all field are required!" });
  }
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(401).json({ message: "user already exist!" });
    }
    if (password !== confirmPass) {
      return res
        .status(401)
        .json({ message: "password and confirm password are different" });
    }
    const salt = 10;
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashPassword,
      gender,
    });
    await newUser.save();
    const Token = generateToken(newUser._id)
    res.status(201).json({ Token, newUser, message: "account created successfully" });
  } catch (error) {
    res.status(501).json({ message: "server error", error: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ message: "all field are required" });
  try {
    const newUser = await User.findOne({ email });
    if (!newUser)
      return res.status(401).json({ message: "user does not exists!" });
    const isPasswordMatch = await bcrypt.compare(password, newUser.password);

    if (!isPasswordMatch)
      return res.status(401).json({ message: "worng password!" });
    

    const Token = generateToken(newUser._id)

    res
      .status(200)
      
      .json({ Token ,newUser, message: "logged in successfully" });
  } catch (error) {
    res.status(501).json({ message: "server error", error });
  }
};
export const getUser = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
