const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "arya12345kishan@gmail.com",
        pass: process.env.EMAIL_NODEMAILER,
    },
});

exports.sendMail = async ({ email, subject, html }) => {

    try {

        const info = await transporter.sendMail({
            from: '"HireHub 👻" <arya12345kishan@gmail.com>',
            to: email,
            subject: subject,
            text: "Hello world?",
            html: html,
        });

        return info;


    } catch (error) {
        console.log(error);
        console.log("UNABLE TO SEND EMAIL THORUGH NODEMAILER");
        return "UNABLE TO SEND EMAIL";
    }

}
