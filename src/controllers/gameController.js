const router = require('express').Router();

router.get('/catalog', (req, res) => {

    res.render('/catalog');
});


module.exports = router;