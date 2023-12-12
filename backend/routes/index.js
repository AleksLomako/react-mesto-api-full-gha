const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const { validateLoginUser, validateRegisterUser } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const corsMiddleware = require('../middlewares/corsMiddleware');
const UserRouter = require('./users');
const CardRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

// Логгер запросов
router.use(requestLogger);

router.use(corsMiddleware);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateLoginUser, loginUser);
router.post('/signup', validateRegisterUser, createUser);

router.use(auth);
router.use('/users', UserRouter);
router.use('/cards', CardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// Логгер ошибок
router.use(errorLogger);

module.exports = router;
