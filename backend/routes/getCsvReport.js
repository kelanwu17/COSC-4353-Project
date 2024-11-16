const express = require('express');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const db = require ('../config/dj');
const PDFDocument = require('pdfkit'); 
const router = express.Router(); // Initialize the router

// Route for downloading CSV report of Registered Events
router.get('/download/csv/registered-events', (req, res) => {
    const sql = `
        SELECT e.*, COUNT(r.rEventsID) AS registration_count
        FROM Events e
        LEFT JOIN RegisterEvents r ON e.eventsID = r.rEventsID
        GROUP BY e.eventsID;
    `;
  
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching event data", err);
            return res.status(500).send("Error fetching event data.");
        }

        const csvWriter = createObjectCsvWriter({
            path: path.join(__dirname, 'registered_events_report.csv'),
            header: [
                { id: 'eventsID', title: 'Event ID' },
                { id: 'title', title: 'Event Title' },
                { id: 'description', title: 'Description' },
                { id: 'location', title: 'Location' },
                { id: 'urgency', title: 'Urgency' },
                { id: 'startTime', title: 'Start Time' },
                { id: 'endTime', title: 'End Time' },
                { id: 'eventCreated', title: 'Event Created' },
                { id: 'registration_count', title: 'Registration Count' }
            ]
        });

        csvWriter.writeRecords(results)
            .then(() => {
                res.download(path.join(__dirname, 'registered_events_report.csv'), 'registered_events_report.csv', (err) => {
                    if (err) {
                        console.error("Error sending file", err);
                        res.status(500).send("Error sending CSV file.");
                    }
                });
            })
            .catch((err) => {
                console.error("Error generating CSV", err);
                res.status(500).send("Error generating CSV file.");
            });
    });
});
// Route for downloading PDF report of Registered Events
router.get('/download/pdf/registered-events', (req, res) => {
    const sql = `
        SELECT e.*, COUNT(r.rEventsID) AS registration_count
        FROM Events e
        LEFT JOIN RegisterEvents r ON e.eventsID = r.rEventsID
        GROUP BY e.eventsID;
    `;
  
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching event data", err);
            return res.status(500).send("Error fetching event data.");
        }

        const doc = new PDFDocument();  // Corrected: Using PDFDocument
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="registered_events_report.pdf"');
        doc.pipe(res);

        doc.fontSize(20).text('Registered Events Report', { align: 'center' });
        doc.fontSize(12).moveDown();

        results.forEach((event) => {
            doc.text(`Event Title: ${event.title}`);
            doc.text(`Description: ${event.description}`);
            doc.text(`Location: ${event.location}`);
            doc.text(`Start Time: ${event.startTime}`);
            doc.text(`End Time: ${event.endTime}`);
            doc.text(`Registration Count: ${event.registration_count}`);
            doc.text('---');
        });

        doc.end();
    });
});

router.get('/download/csv/allProfiles', (req, res) => {
    const sql = "SELECT User.userID, fullName, email, Events.title, Events.eventCreated, Events.startTime, Events.endTime FROM User, RegisterEvents, Events WHERE RegisterEvents.userId = User.userID AND RegisterEvents.eventsID = Events.eventsID";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching user profiles and events data", err);
            return res.status(500).send("Error fetching data.");
        }

        const csvWriter = createObjectCsvWriter({
            path: path.join(__dirname, 'all_profiles_report.csv'),
            header: [
                { id: 'userID', title: 'User ID' },
                { id: 'fullName', title: 'Full Name' },
                { id: 'email', title: 'Email' },
                { id: 'title', title: 'Event Title' },
                { id: 'eventCreated', title: 'Event Created' },
                { id: 'startTime', title: 'Start Time' },
                { id: 'endTime', title: 'End Time' }
            ]
        });

        csvWriter.writeRecords(results)
            .then(() => {
                res.download(path.join(__dirname, 'all_profiles_report.csv'), 'all_profiles_report.csv', (err) => {
                    if (err) {
                        console.error("Error sending file", err);
                        res.status(500).send("Error sending CSV file.");
                    }
                });
            })
            .catch((err) => {
                console.error("Error generating CSV", err);
                res.status(500).send("Error generating CSV file.");
            });
    });
});

router.get('/download/pdf/allProfiles', (req, res) => {
    const sql = "SELECT User.userID, fullName, email, Events.title, Events.eventCreated, Events.startTime, Events.endTime FROM User, RegisterEvents, Events WHERE RegisterEvents.userId = User.userID AND RegisterEvents.eventsID = Events.eventsID";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching user profiles and events data", err);
            return res.status(500).send("Error fetching data.");
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="all_profiles_report.pdf"');
        doc.pipe(res);

        doc.fontSize(20).text('User Profiles and Event Details Report', { align: 'center' });
        doc.fontSize(12).moveDown();

        results.forEach((profile) => {
            doc.text(`User ID: ${profile.userID}`);
            doc.text(`Full Name: ${profile.fullName}`);
            doc.text(`Email: ${profile.email}`);
            doc.text(`Event Title: ${profile.title}`);
            doc.text(`Event Created: ${profile.eventCreated}`);
            doc.text(`Start Time: ${profile.startTime}`);
            doc.text(`End Time: ${profile.endTime}`);
            doc.text('---');
        });

        doc.end();
    });
});
// Export the router so it can be used in your app.js
module.exports = router;
