const mongoose = require("mongoose")
const User = require("../models/user")
const app = require("../app")
const{ connectDB} = require("../config/db")

const request = require("supertest")
jest.setTimeout(100000)

beforeEach(async() => {
	await connectDB()
})



test("GET /users", async () => {
	const user = await User.create({
		name:"ader",
		email:"jjiuhgcfyufytyyitytovtvyvtyvtyrftdtdygyuoftytfttdrdtrutrdrdtdrdrfyugyfutfygugyguiluiluiuggygyyyhdyyter",
		password:"ader",
    quizes:[]
	})

	await request(app)
		.get("/api/users")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(1)

			// Check the response data
			expect(response.body[0]._id).toBe(user.id)
		})
})

/*

await supertest(app)
		.post("/api/posts")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBeTruthy()
			expect(response.body.title).toBe(data.title)
			expect(response.body.content).toBe(data.content)

			// Check the data in the database
			const post = await Post.findOne({ _id: response.body._id })
			expect(post).toBeTruthy()
			expect(post.title).toBe(data.title)
			expect(post.content).toBe(data.content)
		})


    */



