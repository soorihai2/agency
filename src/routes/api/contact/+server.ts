import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP host
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS  // Use environment variable
    }
});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.json();
        const { name, email, phone, course, message } = formData;

        // Validate required fields
        if (!name || !email || !phone || !message) {
            return json({
                success: false,
                message: 'Please fill in all required fields'
            }, { status: 400 });
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'info@bngsolutions.com', // Replace with your email
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                ${course ? `<p><strong>Interested Course:</strong> ${course}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return json({
            success: true,
            message: 'Thank you for your message. We will get back to you soon!'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        }, { status: 500 });
    }
}; 