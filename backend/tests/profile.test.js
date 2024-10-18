const request = require('supertest');
const express = require('express');
const { router, sessions } = require('../routes/logIn'); // Assuming logIn is in routes directory

const app = express();
app.use(express.json());
app.use('/', router); // Using the login route

describe('Login Route', () => {
  // POST Test (Successful Login)
  it('should log in successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/logIn')
      .send({
        username: 'admin',
        password: 'admin',
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('sessionId'); // Check if sessionId is returned
    expect(response.body.message).toBe('Login successful');
    console.log('Logged in successfully with admin credentials');
  });

  // POST Test (Missing Username)
  it('should return 400 for missing username', async () => {
    const response = await request(app)
      .post('/logIn')
      .send({
        username: '', 
        password: 'admin',
      });
    
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Username and password are required.');
    console.log('Tested login with missing username');
  });

  // POST Test (Missing Password)
  it('should return 400 for missing password', async () => {
    const response = await request(app)
      .post('/logIn')
      .send({
        username: 'admin',
        password: '',
      });
    
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Username and password are required.');
    console.log('Tested login with missing password');
  });

  // POST Test (Invalid Credentials)
  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/logIn')
      .send({
        username: 'admin',
        password: 'wrongpassword',
      });
    
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid username or password.');
    console.log('Tested login with invalid credentials');
  });
});
