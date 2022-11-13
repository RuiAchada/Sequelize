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
  await sequelize.sync({ alter: true }) // sync looks at our models and create database tables.
  console.log("Database synced!")
})
