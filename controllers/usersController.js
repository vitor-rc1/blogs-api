const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await usersService.createUser(displayName, email, password, image);
    res.status(201).json(newUser);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
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
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await usersService.getUserById(id);
    res.status(200).json(users);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await usersService.deleteUser(id);
    res.status(204).json();
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  login,
  getUserById,
  deleteUser, 
};