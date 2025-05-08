import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config();

export const register = async (req, res) => {
    // Cek jika ada field yang kosong
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Some fields are required" });
    }

    // Cek apakah email sudah digunakan
    const adaemail = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });

    if (adaemail) {
        return res.status(400).json({ msg: "Email already exists" });
    }

    try {
        // password sebelum disimpan
        const hash = await argon2.hash(req.body.password);

        
        const create = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                hakakses: {
                    create: {
                        statuspegawai: false,
                        statuscontent: false,
                        statusadmin: false,
                        statususer: true
                    }
                }
            }
        });

        return res.status(201).json({ msg: "User registered successfully", user: create });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getall = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                hakakses: true
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const patchuseradmin = async (req, res) => {
    const token = req.cookies.token;
        console.log("Cookies dari request:", token  );

        if (!token) {
            console.log("No token found");
            return res.status(401).json({ msg: "No token found" });
        }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
    console.log("data status per id", decoded.role);

    if (decoded.role !== 1) {
        return res.status(403).json({ msg: "Unauthorized Access" });
    }
   const cekemail = req.params.email;
   console.log(cekemail);
   if (!cekemail) {
    return res.status(400).json({ msg: "Email not found" });
   }

  //    cek didb
   const user = await prisma.user.findUnique({
    where: { email: cekemail },
    include: { hakakses: true }
   });

   if (!user) {
    return res.status(404).json({ msg: "User not found" });
   }

   console.log(user);

      
}

export const Pinupdate = async (req, res) => {
    const token = req.cookies.token;
        console.log("Cookies dari request:", token  );

        if (!token) {
            console.log("No token found");
            return res.status(401).json({ msg: "No token found" });
        }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
    console.log("data status per id", decoded);

    const updateid = decoded.userId;

    try {
        const update = await prisma.user.update({
            where: { id: updateid },
            data: {
               pin: req.body.pin
            }
        })
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const user = await prisma.user.findUnique(
        {
            where: { email: req.body.email },
            include: { hakakses: true }
        },
    );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const match = await argon2.verify(user.password, req.body.password);

        if (!match) {
            return res.status(400).json({ msg: "Password not match" });
        }

        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const role = user.role;
        const statuspegawai = user.hakakses ? user.hakakses.statuspegawai : null;
        const statuscontent = user.hakakses ? user.hakakses.statuscontent : null;
        const statusadmin = user.hakakses ? user.hakakses.statusadmin : null;
        const statususer = user.hakakses ? user.hakakses.statususer : null;

        // console.log("ACCESS_TOKEN:", process.env.ACCESS_TOKEN);
        // console.log("FRESH_TOKEN:", process.env.REFRESH_TOKEN);

        const accessToken = jwt.sign({ userId, name, email, role, statuscontent, statuspegawai, statusadmin, statususer }, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
        const refreshToken = jwt.sign({ userId, name, email, role, statuscontent, statuspegawai, statusadmin, statususer }, process.env.REFRESH_TOKEN, { expiresIn: "1d" });

        await prisma.user.update({
            where: { email: req.body.email },
            data: { tokenJwt: refreshToken }
        });
        

        res.cookie("token", refreshToken, {
            httpOnly: true,
            secure: false,  // Pakai `true` jika di HTTPS
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 hari
        });
        res.json({ accessToken });
        console.log("token jwt sended", accessToken);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log("Cookies dari request:", token  );

        if (!token) {
            return res.status(401).json({ msg: "No token found" });
        }

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);

        await prisma.user.update({
            where: { id: decoded.userId },
            data: { tokenJwt: null }
        });

        res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });

        return res.status(200).json({ msg: "Logout success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const getme = async (req, res) => {
    try {
        let refreshToken = req.cookies.token;
        if (!refreshToken) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { 
                id: true, 
                name: true, 
                email: true, 
                role: true, 
                tokenJwt: true,
                hakakses: {
                    select: {
                        statuspegawai: true,
                        statuscontent: true,
                        statusadmin: true,
                        statususer: true
                }}
                
             }
        });

        const akses = [
            user.hakakses.statusadmin,
            user.hakakses.statususer,
            user.hakakses.statuspegawai,
            user.hakakses.statuscontent
        ];
        
        if (akses.some(a => a == null) || akses.every(a => !a)) {
            return res.status(403).json({ msg: "Unauthorized" });
        }
        

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.tokenJwt !== refreshToken) {
            return res.status(403).json({ msg: "Invalid token" });
        }

        // Generate access token baru
        const accessToken = jwt.sign(
            { userId: user.id, name: user.name, email: user.email, role: user.role, 
                statusmentor: user.hakakses ? user.hakakses.statusmentor : null,
                statusadmin: user.hakakses ? user.hakakses.statusadmin : null,
                statususer: user.hakakses ? user.hakakses.statususer : null
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "15m" }
        );

        return res.status(200).json({ user, accessToken });

    } catch (error) {
        return res.status(403).json({ msg: "Invalid token" });
    }
};


//hitung data user 
export const countUser = async (req, res) => {
    try {
        const count = await prisma.user.count();
        return res.status(200).json({ count });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const countadmin = async (req, res) => {
    try {
        const count = await prisma.hakAkses.count({
            where: {
                statusadmin: true
            }
        });
        return res.status(200).json({
            count
        })
    } catch (error) {
        console.log(error);
    }
}

