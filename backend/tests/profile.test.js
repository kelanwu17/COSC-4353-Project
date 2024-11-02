// __tests__/createProfile.test.js
const request = require('supertest');
const express = require('express');
const createProfileRoute =  require('./routes/createProfile');  // Adjust the path if necessary

const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use('/', createProfileRoute); // Mount your route

describe('POST /createprofile', () => {
    it('should create a new profile and return a success message', async () => {
        const newUser = {
            fullName: "Test User",
            email: "test@example.com",
            password: "password123",
            address: "123 Test St",
            address2: "",
            city: "Test City",
            zipcode: "12345",
            selectedSkills: "JavaScript",
            state: "Test State"
        };

        const response = await request(app)
            .post('/createprofile')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Profile created successfully');
        expect(response.body.user).toHaveProperty('userID');
        expect(response.body.user.email).toBe(newUser.email);
    });

    it('should return an error if email or password is missing', async () => {
        const invalidUser = {
            fullName: "Test User",
            address: "123 Test St",
            city: "Test City",
            zipcode: "12345",
            selectedSkills: "JavaScript",
            state: "Test State"
        };

        const response = await request(app)
            .post('/createprofile')
            .send(invalidUser);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal Server Error');
    });

    it('should return an error for database insert failure', async () => {
        // Mocking a database error if needed
        jest.spyOn(db, 'query').mockImplementation((sql, params, callback) => {
            callback(new Error('Database insert error'));
        });

        const newUser = {
            fullName: "Test User",
            email: "test@example.com",
            password: "password123",
            address: "123 Test St",
            address2: "",
            city: "Test City",
            zipcode: "12345",
            selectedSkills: "JavaScript",
            state: "Test State"
        };

        const response = await request(app)
            .post('/createprofile')
            .send(newUser);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal Server Error');
    });
});
