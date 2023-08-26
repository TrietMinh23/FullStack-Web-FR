//reset pass
//contributor: Dat

import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler'

export const sendMail = asyncHandler(async ({ email, html }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        }
    });


    let info = await transporter.sendMail({
        from: '"Fashion Revive" <no-reply@fashionrevive.com>', // sender address
        to: email, // list of receivers
        subject: "Forgot password", // Subject line
        html: html, // html body
    });

    return info
})

