const config = require('../../config.js')
// const Recipient = require("mailersend").Recipient;
// const EmailParams = require("mailersend").EmailParams;
// const MailerSend = require("mailersend"); 
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend")  
const escapeHtml = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

exports.send_email = (req, res) => { 
    const sender = escapeHtml(req.body.sender) 
    const message = escapeHtml(req.body.message) 
    if (!process.env.EMAIL_API_KEY)  { 
        res.status(400).send("Missing crucial info to send message")
        return
    } 
    if (!message)  { 
        res.status(400).send("Missing message body")
        return
    } 
    if (!sender)  { 
        res.status(400).send("Missing sender info")
        return
    }


    const mailerSend = new MailerSend({
        apiKey: process.env.EMAIL_API_KEY
    })
   
    const sentFrom = new Sender( process.env.EMAIL_API_SENDER, 
                                 process.env.EMAIL_API_SENDER_NAME)
   
    const recipients = [
        new Recipient(process.env.EMAIL_TO_ADDRESS, "")
    ]
   
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(process.env.EMAIL_SUBJECT)
        .setHtml("<b>Message:</b><br/>"+ message + "<br/><br/><b>Sender:</b><br/>" + sender)
        //.setText("This is the text content")

    mailerSend.email.send(emailParams)
        .then(data => {
            console.log(data) 
            res.status(200).send("Message sent successfully.  Thank you!")
        })
        .catch(err => {
            console.log(err) 
            res.status(400).send("Message NOT sent successfully. " + err.body.message)
        })
}