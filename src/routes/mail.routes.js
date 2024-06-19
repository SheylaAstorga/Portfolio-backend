import { Router } from "express";
import { enviarMail } from "../controllers/mail.controllers.js";

 const router = Router();

router.route('/mail').post(enviarMail)

export default router;