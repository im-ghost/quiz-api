const request = require('supertest')
const app = require('../../server')
const QuizService = require('../../controllers/quiz')

jest.mock('../../controllers/quiz')

describe('POST /quiz', () => {
  it('creates a new quiz', async () => {
    const quiz = {
      title: 'Example Quiz',
      description: 'An example quiz for testing purposes',
      questions: [
        {
          text: 'What is the capital of France?',
          options: [
            { text: 'Paris' },
            { text: 'London' },
            { text: 'Madrid' },
            { text: 'Berlin' }
          ],
          answer: 0
        }
      ]
    }

    QuizService.create.mockResolvedValue({ id: '123', ...quiz })

    const response = await request(app)
      .post('/quiz')
      .send(quiz)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ id: '123', ...quiz })
  })
})
