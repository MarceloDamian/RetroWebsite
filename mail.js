

const nodemailer = require ('nodemailer');
const mailGun = require ('nodemailer-mailgun-transport');
require("dotenv").config();

// imports packages as nodemailer and nodemailer-mailgun-transport


const auth = {
    auth:
    {   
        api_key: process.env.API_URL,
        domain: "sandboxb984f2dd1d8042d9bbfb2963f0629400.mailgun.org"
    },
};
// auth is needed to set up mailgun. api key and domain are given by mailgun.. 
// ? possibly hide api_key and domain as enviornment variables. 

const transporter = nodemailer.createTransport(mailGun(auth));
// Creates the transporter from nodemailer to mailgun with the new user (api key and domain).

const sendEmails = (email, subject, text, print) => 
{
    const mailOptions = {
    
        from: email,
        to: 'erickcabrera1909@gmail.com',
        subject,
        text
    };
    // json object of index.html with incoming values coming in as a parameter
    
    transporter.sendMail(mailOptions,(err,data)=>
    {
        if (err)
        {
            print(err, null);
        }
        else
        {
            console.log(`${email} Your message has been sent.`)
            print(null,data);
        }
    });
    // transporters built in method sendMail allows direct transfer from email servers. 
    // if (err) catches errors if any. 
}

module.exports = sendEmails; 
// Exports the function SendEmails

// sendEmail ('','','', function (err,data)
// {}); // helps debug and see internal errors from transporter. 




