import express from "express";
import upload from "../upload.js";
import { 
    register, 
    login,  
    getme,
    getall,
    logout,
    countUser,
    countadmin,
    patchuseradmin,
    Pinupdate
} from "../controller/Auth.js";

import { getbyidall, getallnotif, logactivty } from "../controller/Notification.js";
import { getBotToken, addBotToken } from "../controller/admin/BotToken.js";
import { UpdateMaintance, deletebntr, lihatMaintance } from "../controller/admin/Maintance.js";


import { logAktivitas } from "../middleware/Notification.js";
import { notification } from "../middleware/Notification.js";
import { maintenance } from "../middleware/Maintance.js";
import { allstatus, statusadmin, statususer } from "../middleware/Status.js";
import { Verify, isadmin, ismentor } from "../middleware/Verify.js";
import { log } from "console";
// import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// ============ auth =============================================
router.post("/register",maintenance, notification("register", "Berhasil register"), register);
router.post("/login",notification("login", "Baru-baru ini anda login"), logAktivitas, login);
router.get("/getme",maintenance,allstatus, getme);
router.get("/getall",maintenance, allstatus, statusadmin, logAktivitas, getall);
router.post("/logout",maintenance, logout);
// ============ auth =============================================

///maintance///
router.patch("/updatemaintance/:id",allstatus, statusadmin, logAktivitas,notification("updatemaintance", "Maintance berhasil di update"), UpdateMaintance);
router.get("/lihatMaintance",allstatus, statusadmin, logAktivitas, lihatMaintance);
// router.delete("/deletebntr/:id",allstatus, statusadmin, logAktivitas, deletebntr);
///maintance///

router.patch("/pinupdate",maintenance, Pinupdate);
router.get("/getBotToken",maintenance,allstatus, statusadmin, logAktivitas,  getBotToken);
router.post("/addBotToken",maintenance,allstatus, statusadmin, logAktivitas, notification("addBotToken", "Berhasil menambahkan bot token"), addBotToken);

router.get("/notification", maintenance,allstatus, getbyidall);
router.get("/getallnotification",maintenance,allstatus, statusadmin, logAktivitas,  getallnotif);
router.get("/logactivty", maintenance,logactivty);

// ============ count in here ===========================
router.get("/countuser",allstatus, statusadmin, countUser);
router.get("/countadmin",allstatus, statusadmin, countadmin);
router.patch("/patchuseradmin/:id",allstatus, statusadmin, patchuseradmin);
// ============ count in here ===========================
    
export default router;