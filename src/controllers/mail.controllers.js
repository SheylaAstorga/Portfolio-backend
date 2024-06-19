import nodemailer from 'nodemailer'
import { google } from 'googleapis';
import 'dotenv/config'

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

export const enviarMail = async (req, res) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: 'OAuth2',
              user: process.env.mail,
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken
            },
          });

        const {nombre, email, message} = req.body
        await transporter.sendMail({
            from: `"${nombre}" <${email}>`,
            to: 'sheylaastorga1998@gmail.com',
            subject: "trabajo", 
            text: `De: ${email}\n ${message}`,
          });
          res.status(200).json({mensaje: "Se envió el mail correctamente."})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "No se realizó el envío del email."})
    }
}

