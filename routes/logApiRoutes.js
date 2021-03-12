const express  = require('express');
const router = express.Router();
const {addToLog,updateLog,deleteLog,specificLog} = require('../controllers/logApiController');
const {authenticate}=require('../middlewares/authenticate');

router.post('/addToLog',authenticate, addToLog);
router.delete('/:logId',authenticate, deleteLog);
router.patch('/:logId',authenticate, updateLog);
router.get('/:logId',authenticate,specificLog);
module.exports = router;
