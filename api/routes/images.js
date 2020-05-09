const router = require('express').Router();
const { getImage } = require('../controllers/images');

router.route('/:id').get(getImage);

module.exports = router;
