const express = require("express")

const { sequelize, User } = require("./models")

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

app.listen({ port: 5000 }, async () => {
  console.log("Server running on http://localhost:5000")
  await sequelize.authenticate() // authenticate to the DB. Now we'll run the migrations separately to create the tables
  console.log("Database connected!")
})
