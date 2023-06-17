const gameService = require('../services/gameService');
const { getErrorMessages } = require('../utils/errorHelper');
const { isAuth } = require('../middleware/authMiddleware');
const { generatePlatformOptions } = require('../utils/viewHelper');

const router = require('express').Router();

router.get('/catalog', async (req, res) => {

    try {
        const games = await gameService.getAll();
        res.render('games/catalog', { games });
    } catch (error) {
        res.status(400).redirect('404');
    }
});

router.get('/create', isAuth, (req, res) => {
    res.render('games/create');
});

router.post('/create', isAuth, async (req, res) => {
    const gameData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await gameService.create(gameData);
        res.redirect('/games/catalog');
    } catch (err) {
        const error = getErrorMessages(err)[0];
        res.render('games/create', { error });
    }
});

router.get('/:gameId/details', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameService.findbyId(gameId).lean();
        const userId = req.user?._id;
        const gameOwner = game.owner.toString();
        const boughtBy = game.boughtBy.find(x => x.toString() === userId);

        const isOwner = req.user?._id === gameOwner;
        const isGuest = req.user === undefined;
        const isBought = userId !== gameOwner && boughtBy;
        res.render('games/details', { game, isOwner, isGuest, isBought });
    } catch (err) {
        res.status(400).redirect('404');
    }
});

router.get('/:gameId/buy', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameService.findbyId(gameId);
        game.boughtBy.push(req.user._id);
        game.save();
        res.redirect(`/games/${gameId}/details`);
    } catch (err) {
        res.status(400).redirect('404');
    }
});

router.get('/:gameId/delete', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        await gameService.delete(gameId);
        res.redirect('/games/catalog');
    } catch (err) {
        res.status(400).redirect('404');
    }
});

router.get('/:gameId/edit', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameService.findbyId(gameId).lean();
        const options = generatePlatformOptions(game.platform);

        res.render('games/edit', { game, options });
    } catch (err) {
        res.status(400).redirect('404');
    }
});

router.post('/:gameId/edit', async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;

    try {
        await gameService.update(gameId, gameData);

        res.redirect(`/games/${gameId}/details`);
    } catch (err) {
        res.status(400).redirect('404');
    }
});

router.get('/search', async (req, res) => {

    try {
        const games = await gameService.getAll();
        res.render('games/search', { games });

    } catch (err) {
        res.status(400).redirect('404');
    }
});

router.post('/search', async (req, res) => {
    const { search, searchPlatform } = req.body;

    try {
        const games = await gameService.getAll(search, searchPlatform);
        res.render('games/search', { games });

    } catch (err) {
        const error = getErrorMessages(err)[0];
        res.render('games/search', { error });
    }
});


module.exports = router;