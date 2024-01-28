const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const ejs = require('ejs');

const { sign } = require('jsonwebtoken');

const {
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_USER,
    GMAIL_REFRESH_TOKEN,
} = process.env;

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

// TODO - ADD REAL EMAIL
function sendMail(mailOptions) {
    oauth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });
    const accessToken = oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: GMAIL_USER,
            clientId: GMAIL_CLIENT_ID,
            clientSecret: GMAIL_CLIENT_SECRET,
            refreshToken: GMAIL_REFRESH_TOKEN,
            accessToken,
        },
    });

    const { from, to, subject, html } = mailOptions;

    return transporter.sendMail({
        from: from || GMAIL_USER,
        to,
        subject,
        html,
    });
}

const generateToken = (userId) => {
    const token = sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
    return token;
};

const sendBookingConfirmation = (id, email) => {
    const verificationToken = generateToken(id);

    const verificationUrl = `${process.env.REACT_APP_INTERNAL_CLIENT_HOST}/handle-booking?token=${verificationToken}&email=${email}&id=${id}`;

    const emailTemplatePath =
        'server/utils/EmailTemplates/confirmationTemplate.ejs';

    ejs.renderFile(
        emailTemplatePath,
        { verificationUrl },
        async (err, html) => {
            if (err) {
                console.error('Error rendering email template:', err);
                return;
            }

            await sendMail({
                to: email,
                subject: 'Verifiera din e-postadress',
                html,
            });
        }
    );
};

module.exports = {
    sendMail,
    sendBookingConfirmation,
    generateToken,
};
