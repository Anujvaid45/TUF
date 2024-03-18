const express = require('express');
const { getAllListController, createEntryController } = require('../controllers/listController');
const router = express.Router()

//GET all the submitted entries
router.get('/entries',getAllListController)

//create a new entry
router.post('/create',createEntryController)

module.exports = router;