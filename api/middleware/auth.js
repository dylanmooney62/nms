const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const StatusHandler = require('../utils/statusHandler');
const User = require('../models/User');

// Protect route
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  //   Make sure token exists
  if (!token) {
    return next(new StatusHandler(401, 'Not authorized to access this route'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    console.log(decoded.id);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new StatusHandler(401, 'Not authorized to access this route'));
  }
});

// Grant access to specific roles
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new StatusHandler(
        403,
        `User role '${req.user.role}' is not authorized to access this route`,
      ),
    );
  }
  next();
};

module.exports = {
  protect,
  authorize,
};
