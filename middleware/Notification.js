import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const notification = (tipe, pesan) => {
    return async (req, res, next) => {
      const token = req.cookies.token;
      if (!token) return next();
  
      try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
        const hashmessage = await argon2.hash(pesan);
        const hashtipe = await argon2.hash(tipe);
        await prisma.notifikasi.create({
          data: {
            userId: decoded.userId,
            name: decoded.name,
            email: decoded.email,
            pesan: pesan,
            tipe: tipe
          }
        });
      } catch (error) {
        // bisa dilewati jika logging gagal
        console.error("Gagal mencatat notifikasi:", error.message);
      }
      next();
    };
  };
  

export const logAktivitas = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return next(); // Lewati jika tidak ada token
  
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
      const userId = decoded.userId;
  
      await prisma.aktivitas.create({
        data: {
          userId,
          method: req.method,
          route: req.originalUrl
        }
      });
    } catch (err) {
      console.error("Gagal mencatat aktivitas:", err.message);
      // Tetap lanjut meskipun log gagal
    }
  
    next();
  };