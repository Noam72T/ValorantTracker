const express = require('express');
const router = express.Router();
const { protect } = require('../middlerware/auth');
const {
  updateConsent,
  exportUserData,
  requestDeletion,
  cancelDeletion,
  deleteAccount,
  getConsentStatus
} = require('../controllers/gdprController');

router.get('/consent', protect, getConsentStatus);
router.put('/consent', protect, updateConsent);
router.get('/export', protect, exportUserData);
router.post('/request-deletion', protect, requestDeletion);
router.post('/cancel-deletion', protect, cancelDeletion);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
