const gameService = require('../services/gameService');
const { getErrorMessages } = require('../utils/errorHelper');
const router = require('express').Router();

router.get('/catalog', async (req, res) => {

    try {
        const games = await gameService.getAll().lean();
        res.render('games/catalog', { games });
    } catch (error) {
        res.status(400).redirect('404');
    }
});

router.get('/create', (req, res) => {

    res.render('games/create');
});

router.post('/create', async (req, res) => {
    const gameData = {
        ...req.body,
        owner: req.user._id,
    };
    console.log(gameData);
    try {
        await gameService.create(gameData);
        res.redirect('/games/catalog');
    } catch (err) {
        const error = getErrorMessages(err)[0];
        res.render('games/create', { error });
    }
});
module.exports = router;