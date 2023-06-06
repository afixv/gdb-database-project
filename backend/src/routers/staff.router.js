const express = require('express')
const router = express.Router()

const Staff = require('../controllers/staff.controller');
// Staffs
router.get('/', Staff.index);
router.post('/', Staff.create);
router.delete('/:id', Staff.delete);
router.put('/:id', Staff.update);

module.exports = router