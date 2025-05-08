import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const maintenance = async (req, res, next) => {
    try {
        const maintenanceMode = await prisma.maintance.findFirst({
            where: { open: true }
        });

        if (maintenanceMode) {
            return res.status(503).json({
                message: "Service sedang dalam perawatan (maintenance). Silakan coba lagi nanti."
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server.",
            error: error.message
        });
    }
};
