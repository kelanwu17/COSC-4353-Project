const nodemailer = require('nodemailer');
const db = require('../backend/config/dj');

// Set up email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '4353project@gmail.com',
        pass: '#4353Project#'
    }
});

async function processEmailQueue() {
    // Select pending notifications with user email and event details
    const query = `
        SELECT Notifications.nID, Notifications.userID, Notifications.rEventsID, 
               Notifications.notificationStatus, User.email, User.fullName
        FROM Notifications
        INNER JOIN RegisterEvents ON Notifications.rEventsID = RegisterEvents.rEventsID
        INNER JOIN User ON Notifications.userID = User.userID
        WHERE Notifications.notificationStatus = 'pending'
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching notifications:", error);
            return;
        }

        results.forEach((notification) => {
            const mailOptions = {
                from: '"Event Notifier" 4353project@gmail.com',
                to: notification.email,
                subject: 'Event Reminder',
                text: `Hello ${notification.fullName},\n\nYou have an upcoming event!`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(`Failed to send email to ${notification.email}:`, err);
                } else {
                    console.log(`Email sent to ${notification.email}: ${info.response}`);

                    // Update the notification status to 'sent'
                    db.query(
                        "UPDATE Notifications SET notificationStatus = 'sent' WHERE nID = ?",
                        [notification.nID],
                        (updateErr) => {
                            if (updateErr) {
                                console.error("Error updating notification status:", updateErr);
                            } else {
                                console.log(`Notification status updated to 'sent' for nID: ${notification.nID}`);
                            }
                        }
                    );
                }
            });
        });
    });
}

// Run the function every 5 minutes
setInterval(processEmailQueue, 5 * 60 * 1000); // 5 minutes

module.exports = { processEmailQueue }; 