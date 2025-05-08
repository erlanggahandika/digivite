import TelegramBot from 'node-telegram-bot-api';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();
const BOT_TOKEN = '7499939479:AAE4ds81yDIPqr3dDVlEg64fZz1GCBy1JDc';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const isVerified = {};
const session = {};
const pemeliharaan = {};

bot.onText(/\/user/, async (msg) => {
  const chatId = msg.chat.id;

  if (await isUnderMaintenance(chatId)) return;

  if (!isVerified[chatId]) {
    await bot.sendMessage(chatId, '🔒 Masukkan PIN admin untuk melihat data user:');
    
    //  input PIN dari user
    bot.once('message', async (pinMsg) => {
      const pinInput = pinMsg.text?.trim();

      // Ambil admin dari database yang memiliki hakakses.statusadmin === true
      const admin = await prisma.user.findFirst({
        where: {
          hakakses: { statusadmin: true },
          pin: pinInput
        },
        include: { hakakses: true }
      });

      if (admin) {
        isVerified[chatId] = true;
        await bot.sendMessage(chatId, '✅ Akses diizinkan. Menampilkan data user...');

        tampilkanDataUser(chatId);
      } else {
        await bot.sendMessage(chatId, '❌ PIN salah. Akses ditolak.');
      }
    });

    return;
  }

  tampilkanDataUser(chatId);
});


async function isUnderMaintenance(chatId) {
    const maintenance = await prisma.maintance.findFirst({
      where: { open: true }
    });
  
    if (maintenance) {
        
        await bot.sendMessage(chatId, '⚙️ Sistem sedang dalam perawatan. Silakan coba lagi nanti.');
        return true;
      }

    return false;
}
  
  

// Fungsi untuk menampilkan data user
async function tampilkanDataUser(chatId) {
    const pemeliharaan = await prisma.maintance.findFirst();

    if (pemeliharaan.open === true) {
        await bot.sendMessage(chatId, '🛠 Saat ini website sedang dalam pemeliharaan.');
        return;
    }
  try {
    const users = await prisma.user.findMany({
      include: { hakakses: true }
    });

    if (users.length === 0) {
      await bot.sendMessage(chatId, 'Tidak ada data user.');
      return;
    }

    let pesan = `📋 *Daftar User:*\n\n`;
    users.forEach((user, i) => {
      const hakAkses = user.hakakses || {};

      const statusList = [];
      if (hakAkses.statususer) statusList.push('👤 User');
      if (hakAkses.statusadmin) statusList.push('🛠️ Admin');
      if (hakAkses.statuscontent) statusList.push('📝 Content');
      if (hakAkses.statuspegawai) statusList.push('👔 Pegawai');

      const statusAkses = statusList.length > 0 ? statusList.join(', ') : 'Tidak diketahui';

      pesan += `${i + 1}. ${user.name ?? 'Tidak diketahui'}\n📧 ${user.email ?? '-'}\n🔑 Hak Akses: ${statusAkses}\n\n`;
    });

    await bot.sendMessage(chatId, pesan, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error(error);
    await bot.sendMessage(chatId, '❌ Gagal mengambil data user.');
  }
}
bot.onText(/\/logout/, async (msg) => {
    const chatId = msg.chat.id;
  
    // Reset verifikasi admin di bot
    await logoutbot(chatId);
  });
  

bot.onText(/\/login/, async (msg) => {
    const chatId = msg.chat.id;
  
    if (isVerified[chatId]) {
      return tampilkanOpsiadmin(chatId);
    }
  
    await bot.sendMessage(chatId, '📧 Masukkan email admin:');
  
    bot.once('message', async (emailMsg) => {
      const emailInput = emailMsg.text?.trim();
  
      await bot.sendMessage(chatId, '🔑 Masukkan password admin:');
  
      bot.once('message', async (passwordMsg) => {
        const passwordInput = passwordMsg.text?.trim();
  
        const admin = await prisma.user.findUnique({
          where: { email: emailInput },
          include: { hakakses: true }
        });
  
        if (!admin) {
          return bot.sendMessage(chatId, '❌ Email tidak ditemukan.');
        }
  
        const valid = await argon2.verify(admin.password, passwordInput);
        if (!valid) {
          return bot.sendMessage(chatId, '❌ Password salah. Coba lagi dengan /login');
        }
  
        if (!admin.hakakses?.statusadmin) {
          return bot.sendMessage(chatId, '🚫 Anda tidak memiliki hak akses admin.');
        }
  
        isVerified[chatId] = true;
        session[chatId] = emailInput;
        await bot.sendMessage(chatId, `✅ Login berhasil. Selamat datang, ${admin.name}!`);
        tampilkanOpsiadmin(chatId);
      });
    });
  });
  
  
  const adminMessageId = {};


  async function tampilkanOpsiadmin(chatId) {
    const sent = await bot.sendMessage(chatId, '📋 Pilih menu admin:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '👥 Data User', callback_data: 'menu_user' }],
          [{ text: '🔔 Notifikasi', callback_data: 'menu_notifikasi' }],
          [{ text: '📊 Rekapan', callback_data: 'menu_rekapan' }],
          [{ text: '🛠 Maintenance', callback_data: 'menu_maintenance' }],
          [{ text: '⏱ Penjadwalan Otomatis', callback_data: 'menu_penjadwalan' }],
          [{ text: 'whoami', callback_data: 'whoami' }],
          [{ text: '👤 Logout', callback_data: 'logout' }]
        ]
      }
    });
  
    adminMessageId[chatId] = sent.message_id;  // simpan ID-nya
  }
  
  
  
  bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    if (!isVerified[chatId] && data !== 'login') {
        await bot.sendMessage(chatId, '❌ Anda belum login. Silakan login terlebih dahulu.');
        return;
      }
    try {
      if (data === 'maintenance_on') {
        await prisma.maintance.updateMany({ data: { open: true } });
        await bot.answerCallbackQuery(callbackQuery.id, { text: '🔒 Maintenance diaktifkan.' });
        await tampilkanSubmenuMaintenance(chatId);
      } else if (data === 'maintenance_off') {
        await prisma.maintance.updateMany({ data: { open: false } });
        await bot.answerCallbackQuery(callbackQuery.id, { text: '🔓 Maintenance dinonaktifkan.' });
        await tampilkanSubmenuMaintenance(chatId);
      } else if (data === 'back_to_admin') {
        await tampilkanOpsiadmin(chatId);
      } else if (data === 'menu_maintenance') {
        await tampilkanSubmenuMaintenance(chatId);
      } else if (data === 'menu_user') {
        await tampilkanDataUser(chatId);
      } else if (data === 'menu_notifikasi') {
        await bot.sendMessage(chatId, '🔔 Mengirim notifikasi (fitur ini belum diimplementasikan)');
      } else if (data === 'menu_rekapan') {
        await bot.sendMessage(chatId, '📊 Menampilkan rekapan data (fitur ini belum diimplementasikan)');
      } else if (data === 'whoami') {
        await getme(chatId);
      } else if (data === 'menu_penjadwalan') {
        await bot.sendMessage(chatId, '⏱ Menampilkan penjadwalan otomatis (fitur ini belum diimplementasikan)');
      } 
        else if (data === 'logout') {
        isVerified[chatId] = false;
      
        // Hapus menu admin jika masih ada
        if (adminMessageId[chatId]) {
          try {
            await bot.deleteMessage(chatId, adminMessageId[chatId]);
            delete adminMessageId[chatId];
          } catch (err) {
            console.error("❌ Gagal hapus pesan menu admin:", err.message);
          }
        }
      
        await bot.sendMessage(chatId, '✅ Logout berhasil.');
        await logoutbot(chatId);
      }
    } catch (error) {
      console.error('Callback error:', error);
      await bot.sendMessage(chatId, '❌ Terjadi kesalahan saat memproses perintah.');
    }
  });
  

  async function tampilkanSubmenuMaintenance(chatId) {
    try {
      const maintenance = await prisma.maintance.findFirst(); // ambil status
      pemeliharaan[chatId] = maintenance.open;
  
      let keyboard = [];
  
      if (maintenance?.open === true) {
        // Sedang maintenance → kasih opsi untuk buka
        keyboard.push([
          { text: '🔓 Buka Akses Web', callback_data: 'maintenance_off' }
        ]);
      } else {
        // Tidak maintenance → kasih opsi untuk tutup
        keyboard.push([
          { text: '🔒 Tutup Akses Web', callback_data: 'maintenance_on' }
        ]);
      }
  
      // Tombol kembali ke menu admin
      keyboard.push([
        { text: '⬅️ Kembali', callback_data: 'back_to_admin' }
      ]);
  
      await bot.sendMessage(chatId, `🛠 Status Maintenance Saat Ini: ${maintenance?.open ? "🔒 Aktif" : "🔓 Tidak Aktif"}`, {
        reply_markup: {
          inline_keyboard: keyboard
        }
      });
    } catch (error) {
      console.error("Gagal menampilkan submenu maintenance:", error);
      await bot.sendMessage(chatId, '❌ Terjadi kesalahan saat mengambil status maintenance.');
    }
  }
  
  async function logoutbot(chatId) {
    isVerified[chatId] = false; // reset akses
  await bot.sendMessage(chatId, '👤 Anda telah logout.');
  }

async function getme(chatId) {
    const emaill = session[chatId];
    const me = await bot.getMe();
    
    const pemeliharaan = await prisma.maintance.findFirst();

    if (pemeliharaan.open === true) {
        await bot.sendMessage(chatId, '🛠 Saat ini website sedang dalam pemeliharaan.');
        return;
    }
    await bot.sendMessage(chatId, `👤 Informasi akun telegram:\n\n👤 Username: ${me.username}\n👤 ID: ${me.id}\n👤 Nama: ${me.first_name} ${me.last_name}\n👤 Bot: ${me.is_bot ? 'Ya' : 'Tidak'}`);

    const getme = await prisma.user.findUnique({
        where: {
           email: emaill
        },
        include: {
            hakakses: true
        }
    });

    await bot.sendMessage(chatId, `👤 Informasi akun user:\n\n👤 Nama: ${getme.name}\n👤 Email: ${getme.email}\n👤 Status: ${getme.hakakses.statusadmin ? 'Admin' : 'Tidak diketahui'}\n pin admin: ${getme.pin}`);
}
  