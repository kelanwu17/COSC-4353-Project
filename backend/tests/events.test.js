const request = require('supertest');
const express = require('express');
const createEventRoutes = require('../routes/createEvent');
const updateEventRoutes = require('../routes/updateEvent');
const getEventRoutes = require('../routes/getEvent');
const deleteEventRoutes = require('../routes/deleteEvent');

const app = express();
app.use(express.json());
app.use('/', createEventRoutes);
app.use('/', updateEventRoutes);
app.use('/', getEventRoutes);
app.use('/', deleteEventRoutes);

let eventId;

describe('Event Routes', () => {
  // POST Test (Create Event)
  it('should create a new event', async () => {
    const response = await request(app)
      .post('/createevent')
      .send({
        title: 'Sample Event',
        description: 'This is a test event.',
        location: 'Test Location',
        urgency: 'High',
        skills: ['Communication'],
        timeRange: ['2023-10-01T10:00:00', '2023-10-01T12:00:00']
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.event).toHaveProperty('id');
    expect(response.body.event.title).toBe('Sample Event');
    eventId = response.body.event.id; // Store the event ID for further tests
    console.log('Created a new event successfully');
  });

  // POST Test (Invalid Title - Empty)
  it('should return 400 for an invalid (empty) title', async () => {
    const response = await request(app)
      .post('/createevent')
      .send({
        title: '',
        description: 'This is a test event.',
        location: 'Test Location',
        urgency: 'High',
        skills: ['Communication'],
        timeRange: ['2023-10-01T10:00:00', '2023-10-01T12:00:00']
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid title: Title is required and must be less than or equal to 100 characters.');
    console.log('Tested for invalid empty title');
  });

  // POST Test (Invalid Title - Too Long)
  it('should return 400 for an invalid (too long) title', async () => {
    const response = await request(app)
      .post('/createevent')
      .send({
        title: 'A'.repeat(101), 
        description: 'This is a test event.',
        location: 'Test Location',
        urgency: 'High',
        skills: ['Communication'],
        timeRange: ['2023-10-01T10:00:00', '2023-10-01T12:00:00']
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid title: Title is required and must be less than or equal to 100 characters.');
    console.log('Tested for invalid long title');
  });

 // POST Test (Invalid Description)
it('should return 400 for an invalid description', async () => {
  const response = await request(app)
    .post('/createevent')
    .send({
      title: 'Sample Event',
      description: '', 
      location: 'Test Location',
      urgency: 'High',
      skills: ['Communication'],
      timeRange: ['2023-10-01T10:00:00', '2023-10-01T12:00:00']
    });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Description is required.');
    console.log('Tested for invalid empty description');
  });

// POST Test (Invalid Skills)
it('should return 400 for invalid skills', async () => {
  const response = await request(app)
    .post('/createevent')
    .send({
      title: 'Sample Event',
      description: 'This is a test event.',
      location: 'Test Location',
      urgency: 'High',
      skills: [], 
      timeRange: ['2023-10-01T10:00:00', '2023-10-01T12:00:00']
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe('At least one skill is required.'); // Match actual message
  console.log('Tested for invalid empty skills array');
});

  // POST Test (Invalid Time Range)
  it('should return 400 for an invalid time range', async () => {
    const response = await request(app)
      .post('/createevent')
      .send({
        title: 'Sample Event',
        description: 'This is a test event.',
        location: 'Test Location',
        urgency: 'High',
        skills: ['Communication'],
        timeRange: ['InvalidDate', '2023-10-01T12:00:00'] 
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('A valid start and end date are required.');
    console.log('Tested for invalid time range');
  });

  // POST Test (Invalid Location)
  it('should return 400 for an invalid location', async () => {
    const response = await request(app)
      .post('/createevent')
      .send({
        title: 'Sample Event',
        description: 'This is a test event.',
        location: 'Invalid!Location@With#Special$Characters', 
        urgency: 'High',
        skills: ['Communication'],
        timeRange: ['2023-10-01T10:00:00', '2023-10-01T12:00:00']
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Location required should only contain letters, numbers, spaces, dashes, and commas.');
    console.log('Tested for invalid location');
  });

  // GET Test (Retrieve All Events)
  it('should retrieve all events', async () => {
    const response = await request(app).get('/events');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0); 
    console.log('Retrieved all events successfully');
  });

  // GET Test (Retrieve Single Event by ID)
  it('should retrieve a single event by ID', async () => {
    const response = await request(app).get(`/events/${eventId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', eventId);
    expect(response.body).toHaveProperty('title', 'Sample Event'); 
    console.log('Retrieved event by ID successfully');
  });

  // GET Test (Retrieve Non-existent Event by ID)
  it('should return 404 when retrieving a non-existent event', async () => {
    const nonExistentEventId = 9999; 
    const response = await request(app).get(`/events/${nonExistentEventId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Event Not Found');
    console.log('Tried to retrieve non-existent event - passed');
  });

  // GET Test (Retrieve Event with Invalid ID)
  it('should return 400 when retrieving an event with an invalid ID', async () => {
    const invalidEventId = 'abc'; 
    const response = await request(app).get(`/events/${invalidEventId}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid event ID');
    console.log('Tried to retrieve event with invalid ID - passed');
  });

  // PATCH Test (Update Event)
  it('should update an existing event', async () => {
    const response = await request(app)
      .patch(`/events/${eventId}`)
      .send({
        title: 'Updated Event',
        description: 'This is an updated test event.',
        location: 'Updated Location',
        urgency: 'Medium',
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.event.title).toBe('Updated Event');
    expect(response.body.event.description).toBe('This is an updated test event.');
    console.log('Updated event successfully');
  });

  // PATCH Test (Partial Update - Only Update Title)
  it('should update only the title of an existing event', async () => {
    const response = await request(app)
      .patch(`/events/${eventId}`)
      .send({
        title: 'Partially Updated Title'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.event.title).toBe('Partially Updated Title');
    expect(response.body.event.description).toBe('This is an updated test event.'); 
    console.log('Updated event title only successfully');
  });

  // PATCH Test (Invalid Title)
  it('should return 400 for an invalid title', async () => {
    const response = await request(app)
      .patch(`/events/${eventId}`)
      .send({
        title: 'A'.repeat(101), 
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid title: Title must be less than or equal to 100 characters.');
    console.log('Tested for invalid title on update');
  });

  // PATCH Test (Invalid Location)
  it('should return 400 for an invalid location', async () => {
    const response = await request(app)
      .patch(`/events/${eventId}`)
      .send({
        location: 'Invalid!Location@With#Special$Characters' 
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid location: Location should only contain letters, numbers, spaces, dashes, and commas.');
    console.log('Tested for invalid location on update');
  });

  // PATCH Test (Non-existent Event)
  it('should return 404 when updating a non-existent event', async () => {
    const nonExistentEventId = 9999;
    const response = await request(app)
      .patch(`/events/${nonExistentEventId}`)
      .send({
        title: 'Non-existent Event'
      });
    
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Event Not Found');
    console.log('Tried to update non-existent event - passed');
  });

  // DELETE Test (Delete Event)
  it('should delete an existing event', async () => {
    const response = await request(app).delete(`/events/${eventId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Event Deleted Successfully');
    console.log('Deleted event successfully');
  });

  // DELETE Test (Non-existent Event, should return 404)
  it('should return 404 when trying to delete a non-existent event', async () => {
    const nonExistentEventId = 9999; 
    const response = await request(app).delete(`/events/${nonExistentEventId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Event Not Found');
    console.log('Tried to delete non-existent event - passed');
  });
});


