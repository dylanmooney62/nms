const asyncHandler = require('express-async-handler');
const StatusHandler = require('../utils/statusHandler');
const User = require('../models/User');

// @desc      Get Users
// @route     GET /api/v1/users
// @access    Private
const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get User
// @route     GET /api/v1/users/:id
// @access    Private
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new StatusHandler(404, `User with id ${id} not found`));
  }

  res.status(200).json({ success: true, data: user });
});

// @desc      Create User
// @route     POST /api/v1/users/:id
// @access    Private
const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  // filter password before sending response
  const { _id, name, email, role } = user;

  res.status(201).send({ success: true, data: { _id, name, email, role } });
});

// @desc      Update User
// @route     PUT /api/v1/users/:id
// @access    Private
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({ success: true, data: user });
});

// @desc      Delete User
// @route     DELETE /api/v1/users/:id
// @access    Private
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
