const transport = require("../config/nodemailer.config.js");
const client = require("../config/twilio.config.js");
const path = require("path");
require("dotenv").config();

const renderMail = (req, res) => {
    res.render("mail");
};

const mail = async (req, res) => {
    try {
        const { to, subject, text, file } = req.body;

        const mailOptions = {
            from: 'Camila Figueiredo <camila.ium4256@gmail.com>',
            to: to,
            subject: subject,
            html: text,
            attachments: [],
        };

        if (file) {
            const pathImage = path.join(__dirname, "../../public/image", file);
            mailOptions.html = `<div>${text}</div> <img src='${file}' width='50%'/>`;
            mailOptions.attachments.push({
                filename: file,
                path: pathImage,
            });
        }

        await transport.sendMail(mailOptions);
        return res.status(201).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const whats = async (req, res) => {
    try {
        const { to } = req.body;

        await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
            contentVariables: JSON.stringify({ "1": "409173" }),
            to: `whatsapp:${to}`,
        });

        return res.status(201).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { mail, renderMail, whats };