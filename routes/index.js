const express = require('express');

const router = express.Router();

const Controller = require('../controllers/');

router.post('/', Controller.createConscript);

router.get('/conscripts', Controller.getAll);

router.delete('/', Controller.removeConscript);

module.exports = router;
