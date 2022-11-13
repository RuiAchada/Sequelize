const express = require("express")

const { sequelize, User, Post } = require("./models")

const app = express()
app.use(express.json()) // json parser to parse the body from the response

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body

  try {
    const user = await User.create({ name, email, role })
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll() // the find is usually given a condition of which fields we want to filter by. If no condition, gets all.
    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Something went wrong" })
  }
})

app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where: { uuid: uuid }
    })
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Something went wrong" })
  }
})

app.post("/posts", async (req, res) => {
  const { userUuid, body } = req.body // userUuid should be the user logged in / making the request
  try {
    const user = await User.findOne({ where: { uuid: userUuid } })
    const post = await Post.create({ body, userId: user.id })
    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.listen({ port: 5000 }, async () => {
  console.log("Server running on http://localhost:5000")
  await sequelize.authenticate() // authenticate to the DB. Now we'll run the migrations separately to create the tables
  console.log("Database connected!")
})
