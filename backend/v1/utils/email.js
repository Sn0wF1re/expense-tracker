const { resolve } = require('path');
const { createTransport } = require('nodemailer');

const { EMAIL, PASSWORD } = process.env;
const company = 'WapiDoh';
const baseUrl = 'http://localhost:9000';

// initialize nodemailer
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

// dynamically import nodemailer-express-handlebars
(async () => {
    const { default: hbs } = await import('nodemailer-express-handlebars');

    // initialize handlebars 
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.hbs',
            defaultLayout: false,
        },
        viewPath: resolve(__dirname, '../email-templates'),
        extName: '.hbs'
    }));
})();

// send confirmation email
const sendConfirmationEmail = async (user, confirmationToken) => {
    const url = `${baseUrl}/confirm/?token=${confirmationToken}`;
    const mailOptions = {
        from: EMAIL,
        to: user.email,
        subject: 'Confirm your email',
        template: 'confirmationEmail',
        context: {
            url,
            company,
            name: user.firstName
        }
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.log('Error sending confirmation email', err);
    }
};

// send password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
    const url = `${baseUrl}/update-password/?token=${resetToken}`;
    const mailOptions = {
        from: EMAIL,
        to: user.email,
        subject: 'Reset your password',
        template: 'resetPassword',
        context: {
            url,
            company,
            name: user.firstName
        }
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.log('Error sending password reset email', err);
    }
};

module.exports = {
    sendConfirmationEmail,
    sendPasswordResetEmail
};