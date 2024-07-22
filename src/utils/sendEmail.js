import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendEmail = (email, subject, textMessage, htmlMessage) => {
    const mailOptions = {
        from: process.env.EMAIL, 
        to: email, 
        subject: subject, 
        text: textMessage, 
        html: htmlMessage 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

export default sendEmail;
