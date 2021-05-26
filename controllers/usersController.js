const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await usersService.createUser(displayName, email, password, image);
    res.status(201).json(newUser);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await usersService.login(email, password);
    res.status(200).json(token);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

// const createAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const newAdmin = await usersService.createUser(name, email, password, 'admin');
//     res.status(201).json(newAdmin);
//   } catch (error) {
//     const { message, code } = error;
//     res.status(code).json({
//       message,
//     });
//   }
// };

module.exports = {
  // createAdmin,
  createUser,
  login,
};