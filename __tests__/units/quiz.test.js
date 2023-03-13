// db-handler.js

const mongoose = require('mongoose');

// Define the database URI
const dbUri = 'mongodb://localhost:27017/quizapp';

// Connect to the database
const connect = async () => {
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

// Disconnect from the database
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

// Clear the database
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

// Export the database handler functions
module.exports = { connect, closeDatabase, clearDatabase };

// quizService.test.js

const quizService = require('../services/quizService');
const mongoose = require('mongoose');
const dbHandler = require('./db-handler');

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('Quiz service', () => {
  it('Can create a quiz', async () => {
    const quizData = {
      name: 'Math Quiz',
      description: 'Test your math skills',
      questions: [
        {
          question: 'What is 2+2?',
          answers: ['1', '2', '3', '4'],
          correctAnswer: '4',
        },
        {
          question: 'What is 10-5?',
          answers: ['2', '3', '4', '5'],
          correctAnswer: '5',
        },
      ],
    };
    const createdQuiz = await quizService.createQuiz(quizData);
    expect(createdQuiz.name).toBe('Math Quiz');
    expect(createdQuiz.questions.length).toBe(2);
  });
});
