const express = require('express');
const { getUsers } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router.get('/', protect, roleCheck('admin'), getUsers);

module.exports = router;