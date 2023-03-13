
# Quiz Api

My Node.js Quiz API

## Description

This is a Node.js API that allows users to take quizzes . Users can create, read, update, and delete quizzes using this API.

## Installation

To install and run the API, follow these steps:

1. Clone the repository
 `git clone https://github.com/im-ghost/quiz-api.git
cd quiz-api`
2. Install the required dependencies by running
 `yarn`
3. Create a .env file in the root directory and add your environment variables 
 `
MONGO_URI =
secret =
PORT = 
`
4. Run the API using `yarn server`

## Usage

To use the API, make requests to the following endpoints:

- `/api/v1/users/` (GET, POST)
- `/api/v1/users/user/:id` (PUT, DELETE, GET)
- `/api/v1/users/user/login` (POST)

- `/api/v1/quiz/` (GET, POST)
- `/api/v1/quiz/user/:id` (PUT, DELETE, GET)
- `/api/v1/quiz/user/:id` (GET)


All requests must include a valid JWT token in the `authorization` header.

## Routes and Endpoints

### /api/v1/users/

- `GET /api/v1/users/`: Get all users for the authenticated user.
- `POST /api/v1/users`: Create a new user.

### /api/v1/users/user/:id

- `GET /api/v1/users/user/:id`: Get a specific user by ID for the authenticated user.
- `PUT /api/v1/users/user/:id`: Update a specific user by ID for the authenticated and authorized  user.
- `DELETE /api/v1/users/user/:id`: Delete a specific user by ID for the authenticated and authorized user.

### /api/v1/users/user/login

- `POST /api/v1/users/user/login`: logs user in.
- 

### /api/v1/quiz/

- `POST /api/v1/users`: Create a new quiz.

### /api/v1/quiz/quiz/:id

- `GET /api/v1/quiz/quiz/:id`: Get a specific quiz by ID for the authenticated user.
- `PUT /api/v1/quiz/quiz/:id`: Update a specific quiz by ID for the authenticated and authorized  user.
- `DELETE /api/v1/quiz/quiz/:id`: Delete a specific quiz by ID for the authenticated and authorized user.

### /api/v1/quiz/user/:id

- `GET /api/v1/quiz/user/:id`: Gets all a user selected by id quizzes,it allows queries, limit(number),sortOrder(asc,dsc),sortBy(name,date...).
- 

#### All endpoints will return an error message if failed or the data if successful 


## Example Code

Here's an example of how to use the API to create a new quiz:

```javascript
const fetch = require('node-fetch');

const data = { name: 'Buy milk', questions:[{
  question:"Who is the author of this API",
  options:[{
    a:"ad",
    b:"Richard"
  }],
  correctAnswer:"b"
}],
authorId:`${user._id}`};

fetch('http://localhost:5000/api/v1/quiz', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'authorization': `${TOKEN}`
  },
  body: JSON.stringify(data),
})
.then(res => res.json())
.then(json => console.log(json))
.catch(err => console.error(err));
