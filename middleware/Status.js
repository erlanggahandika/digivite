import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const akses = {
    statuspegawai: true,
    statuscontent: true,
    statusadmin: true,
    statususer: true
}

export const allstatus = async (req, res, next) => {
    console.log("middleware activated allstatus");
    try {
        let refreshToken = req.cookies.token;
        if (!refreshToken) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        console.log("see data",decoded);
        const akses = [
            decoded.statuspegawai,
            decoded.statuscontent,
            decoded.statusadmin,
            decoded.statususer
        ];

        if (akses.some(a => a == null) || akses.every(a => !a)) {
            return res.status(403).json({ msg: "Role tidak memiliki akses, hubungi customer service" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export const statusadmin = async (req, res, next) => {
    console.log("middleware activated statusadmin");
    try {
        let refreshToken = req.cookies.token;
        if (!refreshToken) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        if (decoded.statusadmin !== true) {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const statususer = async (req, res, next) => {
    console.log("middleware activated");
    try {
        let refreshToken = req.cookies.token;
        if (!refreshToken) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        if (decoded.statususer !== true) {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}