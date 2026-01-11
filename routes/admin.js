const express = require("express");
const router = express.Router();
const { renderAdminPanel, handleDeleteUser, handleResetVisitCount } = require("../controllers/adminController");

// Basic Authentication Middleware
const authMiddleware = (req, res, next) => {
  const auth = { login: process.env.ADMIN_USER, password: process.env.ADMIN_PASSWORD };

  // Parse the "Authorization" header
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Verify credentials
  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }

  // Request authentication
  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');
};

router.use(authMiddleware);

router.get("/", renderAdminPanel);
router.post("/delete/:id", handleDeleteUser);
router.post("/reset-visits", (req, res, next) => {
  console.log('Reset visits route called');
  handleResetVisitCount(req, res, next);
});

module.exports = router;
