const express = require('express');
const router = express.Router();
const {
  adminSignIn,
  getMerkleRoot,
  insertAddresses
} = require('../controllers/adminController');

router.post('/adminSignIn', adminSignIn);
router.get('/getMerkleRoot/:whitelistId', getMerkleRoot);
router.get('/insertAddresses', insertAddresses);

module.exports = router;  
