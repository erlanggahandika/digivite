import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config();

//find berdasarkan id user itu sendiri
export const getbyidall = async (req, res) => {
   const token = req.cookies.token;
   if (!token) {
       return res.status(401).json({ msg: "No token found" });
   }
   const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
   const user = await prisma.user.findUnique({
       where: { id: decoded.userId },
       include: { notifikasi: {
           orderBy: { createdAt: "desc" }
       } }
   });
   if (!user) {
       return res.status(404).json({ msg: "User not found" });
   }
   return res.status(200).json({ msg: "Success", data: user.notifikasi });
};

//admin dapat melihat semua notifikasi user
export const getallnotif = async (req, res) => {
    const allnotif = await prisma.notifikasi.findMany();
    return res.status(200).json({ msg: "Success", data: allnotif });
};

export const logactivty =  async (req, res) => {
    const cekActivity = await prisma.aktivitas.findMany({
        include: { user: true }
    });
    return res.status(200).json({ msg: "Success", data: cekActivity });
}