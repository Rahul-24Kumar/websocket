//https://soshace.com/implementing-role-based-access-control-in-a-node-js-application/

//https://youtu.be/jI4K7L-LI58

//https://youtu.be/g-slXEiZ_NI

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { roles } = require("./roles");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

let signup = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    newUser.accessToken = accessToken;

    await newUser.save();

    return res.json({
      messsage: "you have signed up successfully!",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

let login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new Error("Email does not exist"));

    const validPassword = await validatePassword(password, user.password);

    if (!validPassword) return next(new Error("Password is not correct"));

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await User.findByIdAndUpdate(user._id, { accessToken });

    res
      .status(200)
      .send({ data: { email: user.email, role: user.role }, accessToken });
  } catch (error) {
    next(error);
  }
};

let getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send({ messsage: "successfull", data: users });
  } catch (error) {
    next(error);
  }
};

let getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return next(new Error("User does not exist"));
    res.status(200).send({ messsage: "successfull", data: user });
  } catch (error) {
    next(error);
  }
};

let updateUser = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, update);
    const user = await User.findById(userId);
    return res
      .status(200)
      .send({ messsage: "User has been updated!", data: user });
  } catch (error) {
    next(error);
  }
};

let deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .send({ messsage: "user has been deleted successfully!", data: null });
  } catch (error) {
    next(error);
  }
};

let grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted)
        return res
          .status(400)
          .send({ error: "Not allowed to make any changes!" });
      next();
    } catch (error) {
      next(Error);
    }
  };
};

let allowIfLoggedIn = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    console.log(user);
    if (!user) return res.status(400).send({ error: "log in to access!" });
    req.user = user;
    next();
  } catch (error) {
    next(Error);
  }
};

module.exports = {
  signup,
  login,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  grantAccess,
  allowIfLoggedIn,
};
