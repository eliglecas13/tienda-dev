// HOF -> High Order Function
// permissions('admin', 'client')
// router.get('/', permissions('admin'), (req, res) => {})

const permissions = (...allowedRoles) => {
  // allowedRoles = [ 'admin', 'customer' ]
  return (req, res, next) => {
    const { user } = req;
    // ['admin'].includes('customer')
    if (user && allowedRoles.includes(user.user_type)) {
      return next();
    }
    
    // Forbidden
    return res.status(403).json({
      message: 'Forbidden',
    });
  }
}

module.exports = permissions;
