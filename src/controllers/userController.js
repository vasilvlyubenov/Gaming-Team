const router = require('express').Router();
const userService = require('../services/userService');
const { isAuth } = require('../middleware/authMiddleware');
const { getErrorMessages } = require('../utils/errorHelper');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;
    try {
        await userService.register({ username, email, password, rePassword });
        const token = await userService.login(username, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render('users/register', { error: err });
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userService.login(username, password);
        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render('users/login', { error: err });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

router.get('/profile', isAuth, async (req, res) => {
    const user = res.locals.user;
    const pets = await userService.findbyUser(user._id).lean();
    const count = pets.length;

    res.render('users/profile', { user, pets, count });
});

module.exports = router;