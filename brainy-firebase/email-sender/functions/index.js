const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
admin.initializeApp();
const mg = require('nodemailer-mailgun-transport');

/**
* Here we're using Gmail to send 
*/

const auth = {
    auth: {
        user: 'solucionesintegradas24@gmail.com',
        pass: 'pasaporte'
    },
    //proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
}

let transporter = nodemailer.createTransport(mg(auth));

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.body.dest;
        const sub = req.body.sub;
        const html = req.body.html;


        const mailOptions = {
            from: 'Soluciones Integradas <solucionesintegradas24@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: sub, // email subject
            html: html// email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }

            return res.send('Sended');
        });
    });
});
