import express from 'express';
import { verifyPublicKey, createPostInBlockchain } from '../controller/solona/solanaController.js';

const router = express.Router();

// Endpoint untuk login dengan dompet Solana (verifikasi public key)
router.post('/login', async (req, res) => {
  const { publicKey } = req.body;
  
  if (await verifyPublicKey(publicKey)) {
    res.json({ status: 'success', message: 'Login berhasil' });
  } else {
    res.status(400).json({ status: 'error', message: 'Login gagal' });
  }
});

// Endpoint untuk membuat post (konten yang disimpan di blockchain)
router.post('/create-post', async (req, res) => {
  const { publicKey, content } = req.body;

  const result = await createPostInBlockchain(publicKey, content);
  
  if (result.status === 'success') {
    res.json({ status: 'success', message: 'Post berhasil dibuat!', transactionId: result.transactionId });
  } else {
    res.status(500).json({ status: 'error', message: result.message });
  }
});

export default router;
