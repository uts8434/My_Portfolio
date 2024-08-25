import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

// Create Express app
const app = express();
const port = 8080;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'uts8434@gmail.com',
        pass: 'thbqukvkdlcahfmb'
    }
});

app.post('/send-email', (req, res) => {
    const { contactName, contactEmail, contactSubject, contactMessage } = req.body;

    // Validate input
    if (!contactName || !contactEmail || !contactMessage) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    const mailOptions = {
        from: contactEmail,
        to: 'utsav123k@gmail.com',
        subject: contactSubject,
        text: `Name: ${contactName}\nEmail: ${contactEmail}\nMessage: ${contactMessage}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        res.json({ success: true, message: 'Email sent' });
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
