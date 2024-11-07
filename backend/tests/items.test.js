const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Item = require('../models/item');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/workday-integration-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Items API', () => {
  let itemId;

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({
        name: 'Test Item',
        description: 'This is a test item',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    itemId = res.body._id;
  });

  it('should get all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a single item by ID', async () => {
    const res = await request(app).get(`/api/items/${itemId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', itemId);
  });

  it('should update an item by ID', async () => {
    const res = await request(app)
      .put(`/api/items/${itemId}`)
      .send({
        name: 'Updated Test Item',
        description: 'This is an updated test item',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Test Item');
  });

  it('should delete an item by ID', async () => {
    const res = await request(app).delete(`/api/items/${itemId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Item deleted');
  });

  it('should return 404 for non-existent item', async () => {
    const res = await request(app).get('/api/items/invalidId');
    expect(res.statusCode).toEqual(404);
  });

  it('should handle validation errors', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({
        name: '',
        description: '',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should handle invalid input', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({
        name: 'Invalid Item',
        description: 12345, // Invalid description type
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should handle database errors', async () => {
    jest.spyOn(Item.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Database error');
    });
    const res = await request(app)
      .post('/api/items')
      .send({
        name: 'Error Item',
        description: 'This will cause a database error',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should handle missing fields', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({
        name: 'Missing Description',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should handle invalid ID format', async () => {
    const res = await request(app).get('/api/items/123');
    expect(res.statusCode).toEqual(400);
  });

  it('should handle empty request body', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({});
    expect(res.statusCode).toEqual(400);
  });

  it('should check if the backend is running', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(200);
  });
});
