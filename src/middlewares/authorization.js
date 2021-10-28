const jwt = require('jsonwebtoken');
const { UserModel: User } = require('../models/user');

const authorization = (req, res, next) => {
  const {
    authorization: token,
  } = req.headers;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    const { id } = decoded;

    const { _id, email, fullname, user_type } = await User.findById(id); // Expose user in all app requests
    req.user = { _id, email, fullname, user_type };
    next();
  })
}

module.exports = authorization;