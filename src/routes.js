const router = require('express').Router();

const userController = require('./controllers/userController');
const gameController = require('./controllers/gameController');

router.use('/users', userController);
router.use('/games', gameController);
router.get('*', (req, res) => {
    res.status(400).render('404');
});

module.exports = router;