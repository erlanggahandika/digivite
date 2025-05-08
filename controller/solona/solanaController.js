import { Connection, PublicKey, Keypair, Transaction, clusterApiUrl } from '@solana/web3.js';

// Koneksi ke Solana Devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Fungsi untuk memverifikasi publicKey
export const verifyPublicKey = async (publicKey) => {
  try {
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance > 0;
  } catch (error) {
    console.error("Error verifying public key: ", error);
    return false;
  }
};

// Fungsi untuk membuat transaksi atau posting konten
export const createPostInBlockchain = async (publicKey, content) => {
  try {
    const wallet = Keypair.generate(); // Wallet baru
    const tx = new Transaction();
    
    // Menyusun transaksi (misalnya mengirim token)
    const transaction = await connection.sendTransaction(tx, [wallet]);

    // Menyimpan konten di blockchain atau IPFS
    // Anda bisa menambahkan logika untuk menyimpan konten ke blockchain atau IPFS di sini

    return { status: 'success', transactionId: transaction };
  } catch (error) {
    console.error("Error creating post in blockchain: ", error);
    return { status: 'error', message: error.message };
  }
};
