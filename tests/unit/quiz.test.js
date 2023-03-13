const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Quiz = require('../../models/quiz');
const {
  generateToken
} = require("../../middlewares/auth.middleware")
const User = require('../../models/user');
require("dotenv").config()
describe('Quiz API', () => {
  let authToken;
  let quizId;
  let user;
jest.setTimeout(100000)
  beforeAll(async () => {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    // Create a user for testing
     user = new User({
      name: 'Test User',
      email: `${Math.random()}@example.com`,
      password: 'password'
    });
    
    await user.save();
    user.token = generateToken(user._id)
   await user.save()
    // Generate an auth token for the user
    authToken = user.token;
  });

  afterAll(async () => {
    // Disconnect from MongoDB Atlas

    await User.findByIdAndDelete(user._id);
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Create a quiz for testing
    const quiz = new Quiz({
      name: 'Test Quiz',
      questions: [
        { question: 'Question 1', choices: ['Choice 1', 'Choice 2', 'Choice 3'], answer: 'Choice 1' },
        { question: 'Question 2', choices: ['Choice 1', 'Choice 2', 'Choice 3'], answer: 'Choice 2' },
        { question: 'Question 3', choices: ['Choice 1', 'Choice 2', 'Choice 3'], answer: 'Choice 3' }
      ],
      authorId:user._id
    });
    await quiz.save();
    quizId = quiz._id;
  });

  afterEach(async () => {
    // Delete the quiz after testing
    await Quiz.findByIdAndDelete(quizId);
  });

  describe('GET /quiz/:quizId', () => {
    it('should return a quiz', async () => {
      const res = await request(app)
        .get(`/api/v1/quiz/quiz/${quizId}`)
        .set('authorization', `${authToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'Test Quiz');
      expect(res.body).toHaveProperty('questions');
      expect(res.body.questions).toHaveLength(3);
      expect(res.body.questions[0]).toHaveProperty("question")
    })
  })
},29000)
