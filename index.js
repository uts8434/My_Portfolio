import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Create Express app
const app = express();
const port = 8080;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from 'public' directory
// Serve static files from the public folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));



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
        to: 'utsavkumar12203@gmail.com',
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
