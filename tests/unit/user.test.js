const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Quiz = require('../../models/quiz');
const {
  generateToken
} = require("../../middlewares/auth.middleware")
const User = require('../../models/user');
require("dotenv").config()
describe('User API', () => {
  let authToken;
  let userId;
  let user;
jest.setTimeout(130000)
  beforeAll(async () => {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

  });

  afterAll(async () => {
    // Disconnect from MongoDB Atlas

    await User.findByIdAndDelete(user._id);
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Create a quiz for testing
    const user = new User({
     name:"name",
    email:"email",
    password: "pass",
    quizzes:[],
    quizTaken:[]
    });
    user.token = generateToken(user._id);
    await user.save();
    userId = user._id;
    authToken = user.token;
  });

  afterEach(async () => {
    // Delete the quiz after testing
    await User.findByIdAndDelete(userId);
  });

  describe('GET /users/', () => {
    it('should return all users', async () => {
      const res = await request(app)
        .get(`/api/v1/users/`)
        .set('authorization', `${authToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('_id');
     expect(res.body.length).toBeGreaterThan(0)
    
    })
  })
  
  describe('POST /users', () => {
    it('should create a user', async () => {
      const res = await request(app)
        .get(`/api/v1/users/`)
        .set('authorization', `${authToken}`)
        .send({
          name:"name",
          email:"emailpost",
         password: "pass",
        });
        expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'name');
      expect(res.body).toHaveProperty('password');
      
    })
  })
  
  describe('POST /users/user/login', () => {
    it('should return an authenticated user', async () => {
      const res = await request(app)
        .post(`/api/v1/users/user/login/`)
        .set('authorization', `${authToken}`)
        .send({
          name:"name",
          password:"pass"
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'name');
      expect(res.body).toHaveProperty('quizzes');
    })
  })
  
  describe('Get /users/user/:Id', () => {
    it('should return a user', async () => {
      const res = await request(app)
        .put(`/api/v1/users/user/${userId}`)
        .set('authorization', `${authToken}`)
        
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
     expect(res.body).toHaveProperty('name', 'name');
      expect(res.body).toHaveProperty('quizzes');
    })
  })
  
  describe('PUT /users/user/:userId', () => {
    it('should return an updated user', async () => {
      const res = await request(app)
        .put(`/api/v1/users/user/${userId}`)
        .set('authorization', `${authToken}`)
        .send({"name":"Test put"});
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name', 'Test put');
      expect(res.body).toHaveProperty('quizzes');
    })
  })
  describe('DELETE /users/user/:userId', () => {
    it('should delete the user', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/user/${userId}`)
        .set('authorization', `${authToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    })
  })
})
