import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config();

export const getBotToken = async (req, res) => {
    try {
        const token = await prisma.connectTele.findMany();
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const addBotToken = async (req, res) => {
    try {
        const bot_token = await prisma.connectTele.create({
            data: {
                bot_token: req.body.bot_token,
            }
        });
        res.status(200).json(bot_token);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const entitybot  = async (req , res) => {
    try {
       const adddata = await prisma.connectTele.create({
        data: {
            chat_id: req.body.chat_id,
            jam: req.body.jam,
            menit: req.body.menit,
        }
       });
       res.status(200).json(adddata);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const pinAdmin = async (req , res) => {
    try {
       const adddata = await prisma.hakAkses.update({
        where: {
            id: req.body.id
        },
        data: {
            pinAdmin: req.body.pinAdmin
        }
       });
       res.status(200).json(adddata);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}