import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const Verify = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}

export const isadmin = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = req.cookies.token || header && header.split(' ')[1];

    console.log("split token bray",token);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
        if(err) return res.sendStatus(403);
        if(decoded.role !== 1) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}

export const ismentor = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = req.cookies.token || header && header.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
        if(err) return res.sendStatus(403);
        if(decoded.role !== 2) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}

export const mentorditerima = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = req.cookies.token || header && header.split(' ')[1];
    console.log(token);
    next();
}