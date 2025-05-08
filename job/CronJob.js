import cron from 'node-cron';
import moment from 'moment-timezone';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BOT_TOKEN = '7499939479:AAE4ds81yDIPqr3dDVlEg64fZz1GCBy1JDc';
const CHAT_IDS = ['7860343456', '7154423528'];
const MAX_RETRY = 5;
const RETRY_DELAY_MS = 2000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendToTelegram = async (message) => {
  for (const chatId of CHAT_IDS) {
    let success = false;
    let attempt = 0;

    while (!success && attempt < MAX_RETRY) {
      try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        });
        console.log(`✅ Berhasil kirim ke Telegram ID: ${chatId}`);
        success = true;
      } catch (err) {
        attempt++;
        console.error(`❌ Gagal kirim ke ${chatId} (Percobaan ${attempt}): ${err.message}`);
        if (attempt < MAX_RETRY) await delay(RETRY_DELAY_MS);
      }
    }

    if (!success) {
      console.error(`❌ Gagal total kirim ke chat ID ${chatId} setelah ${MAX_RETRY} kali percobaan.`);
    }
  }
};

cron.schedule(
  '09 15 * * *',
  async () => {
    const waktuSekarang = moment().tz('Asia/Jakarta');
    console.log('Cron job triggered at:', waktuSekarang.format());

    const awalHari = moment.tz('Asia/Jakarta').startOf('day').toDate();
    console.log('Awal hari:', awalHari.toLocaleString());

    try {
      const aktivitas = await prisma.aktivitas.findMany({
        where: {
          timestamp: {
            gte: awalHari
          }
        },
        include: { user: true },
        orderBy: { timestamp: 'asc' }
      });
      
      if (aktivitas.length === 0) {
        const pesan = `📭 Tidak ada aktivitas yang ditemukan untuk hari ini (${waktuSekarang.format('DD-MM-YYYY')})`;
        console.log(pesan);
        await sendToTelegram(pesan);
        return;
      }

      let pesan = `📋 *Rekap Aktivitas Hari Ini* (${waktuSekarang.format('DD-MM-YYYY')}):\n\n`;
      aktivitas.forEach((a, i) => {
        const namaUser = a.user?.name ?? 'Tidak diketahui';
        const jam = moment(a.timestamp).tz('Asia/Jakarta').format('HH:mm');
        pesan += `${i + 1}. *${namaUser}* - ${a.method} ${a.route} - ${jam}\n`;
      });

      console.log('Rekap aktivitas:', aktivitas);
      await sendToTelegram(pesan);
    } catch (error) {
      console.error('❌ Error saat mengambil data aktivitas:', error.message);
      await sendToTelegram('❌ Gagal mengambil data aktivitas hari ini.');
    }
  },
  {
    timezone: 'Asia/Jakarta'
  }
);

export default cron;
