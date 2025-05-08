import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config();

export const UpdateMaintance = async (req , res) => {
    const token = req.cookies.token;
        console.log("Cookies dari request:", token  );

        if (!token) {
            console.log("No token found");
            return res.status(401).json({ msg: "No token found" });
        }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
    console.log("data status per id", decoded);

    if(decoded.statusadmin !== true) {
        return res.status(403).json({ msg: "Unauthorized Access" });
    }
      
    try {
        const update = await prisma.maintance.update({
            where: { id: 1 },
            data: {
                open: req.body.open === true ? true : false
            }
        })
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deletebntr = async (req , res) => {
    try {
        const deleteq = await prisma.maintance.delete({
            where: { id: 2 }
        })
        res.status(200).json(deleteq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const lihatMaintance = async (req , res) => {
    try {
        const lihat = await prisma.maintance.findMany();
        res.status(200).json(lihat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}