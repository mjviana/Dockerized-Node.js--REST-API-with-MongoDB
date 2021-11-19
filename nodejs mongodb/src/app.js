require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser"); -> parece ser não necessário
//require("dotenv/config");

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middlewhare
app.use(express.json());

// Routes
const studentsRoute = require("./routes/students");
const classesRoute = require("./routes/classes");
const coursesRoute = require("./routes/courses");
const evaluationComponentsRoute = require("./routes/evaluationComponent");
const gradesroute = require("./routes/grades");
const usersroute = require("./routes/users");
const { response } = require("express");

app.use("/students", studentsRoute);
app.use("/classes", classesRoute);
app.use("/courses", coursesRoute);
app.use("/evaluationComponents", evaluationComponentsRoute);
app.use("/grades", gradesroute);
app.use("/users", usersroute);
app.get('/', (req, res) => { res.status(200).json({ "message": 'All its fine!' }) })

// Connect to db
mongoose.connect(process.env.DB_CONNECTION,
  {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log("Connected to database");
  })
  .catch((error)=> {
    console.log("database connection failed....")
    console.error("erro:" + error);
    process.exit(1);
  });

// Listening
app.listen(process.env.NODE_DOCKER_PORT);
