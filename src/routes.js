const router = require('express').Router();

const userController = require('./controllers/userController');
const petController = require('./controllers/petController');

router.use('/users', userController);
router.use('/pets', petController);
router.get('*', (req, res) => {
    res.status(400).render('404');
});

module.exports = router;