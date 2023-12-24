const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quiz');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const port = 3001;


const app = express();
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  }
}));
app.use(cors({
  origin: "https://localhost:3000",
  credentials: true,
}));

//PUBLIC USER ROUTES TO ALLOW LOGIN
app.use("/user", userRoutes);

//USER AUTHENTICATION AND SUBSEQUENT QUIZ LOGIN
app.use("/", function auth(req, res, next) {
  res.set('Cache-Control', 'no-store');
  if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];
    jwt.verify(token, 'access', (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        console.log('JWT Verification Error:', err);
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    console.log('No authorization token found in session');
    return res.status(403).json({ message: "User not logged in" });
  }
});
app.use("/quiz", quizRoutes);

//HTTPS LOCAL KEY
const https = require('https');
const fs = require('fs');
const sslServer = https.createServer({
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
}, app);
sslServer.listen(port, () => console.log(`HTTPS Server running on port ${port}`));