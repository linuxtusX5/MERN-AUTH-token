const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/sample')

app.post("/api/Register", async (req, res) => {
  console.log(req.body);
  try {
    const newPass = await bcrypt.hash(req.body.pass, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      pass: newPass,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post('/api/login', async (req, res) => {
  
    const user = await User.findOne({ 
        email: req.body.email,
    })

    if(!user){ return { status: 'error', error: 'Invalid' }}

    const ifPassValid = await bcrypt.compare(
        req.body.pass, 
        user.pass
        )

    if (ifPassValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret"
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
});

app.get("/api/populate", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/populate", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return { status: "ok" };
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.get('/GET', (req, res) => {
    res.send('server')
})

app.listen(1337, () => {
  console.log("Server started on 1337");
});