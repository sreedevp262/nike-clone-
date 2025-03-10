module.exports = (req, res, next) => {
    if (req.user.isAdmin !== true) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
  };