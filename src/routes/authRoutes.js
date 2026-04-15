const express = require('express');
const router = express.Router();
const { register, login, deleteUser } = require('../controllers/authController');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

const registerRules = [
    body('username').trim().notEmpty().withMessage('Хэрэглэгчийн нэр оруулна уу').isLength({ min: 3 }).withMessage('Хэрэглэгчийн нэр хамгийн багадаа 3 тэмдэгт байна'),
    body('email').trim().notEmpty().withMessage('Имэйл оруулна уу').isEmail().withMessage('Имэйл буруу форматтай байна.'),
    body('password').notEmpty().withMessage('Нууц үг оруулна уу').isLength({ min: 8 }).withMessage('Нууц үг хамгийн багадаа 8 тэмдэгт байна')
];

const loginRules = [
    body('email').trim().notEmpty().withMessage('Имэйл оруулна уу').isEmail().withMessage('Имэйл буруу форматтай байна'),
    body('password').notEmpty().withMessage('Нууц үг оруулна уу')
]

router.post('/register',registerRules, validate, register);
router.post('/login',loginRules, validate, login);

module.exports = router;