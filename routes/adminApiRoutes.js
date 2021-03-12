const express  = require('express');
const router = express.Router();
const {authenticate}=require('../middlewares/authenticate')
const {adminRegister,adminLogin,adminUpdate,adminLogout,allAdmins,specificAdmin,deleteAdmin} = require('../controllers/adminApiController');

router.post('/register', adminRegister);
router.post('/login',adminLogin);
router.patch('/:adminId',authenticate,adminUpdate)
router.delete('/logout',authenticate,adminLogout);
router.get('/all',authenticate,allAdmins);
router.get('/:adminId',authenticate,specificAdmin);
router.delete('/:adminId',authenticate,deleteAdmin);

module.exports = router;
