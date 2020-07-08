const express = require("express");
// HTTP request logger
const morgan = require("morgan");

const bodyParser = require("body-parser");
// Connect to the client side that run on diffrent port
const cors = require("cors");
// import mongoose
const mongoose = require("mongoose");

const app = express();

/* "start": "NODE_ENV=dev DEBUG=request:* nodemon app.js"*/

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));

mongoose
  .connect("mongodb+srv://brary:brary@cluster0-yvh5q.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");

    if (app._eventsCount > -1) {
      const server = app.listen(8080)
      // require('./controller/queue/socket').init(server)
    }
    require("./routes/index.route")(app, mongoose)

  });



app.post("/", async (req, res, next) => {
  // , 'manager'
  const dbToNoRemove = ['local', 'admin', 'config', 'sushi', 'manager', 'gilad', 'demo'];
  try {
    const Domain = require('./models/domain.model');

    const domains = await Domain.aggregate([{ '$match': {} }, { '$group': { _id: '$domain' } }])


    const databases = domains.map(d => d._id).filter(d => dbToNoRemove.indexOf(d) < 0);
    console.log(databases);

    await Domain.deleteMany({ domain: databases })


    databases.forEach(dbName => {

      mongoose
        .connect(process.env.MONGO_URI + dbName, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then(() => {
          return mongoose.connection.db.dropDatabase();

        });
    })
    res.status(205).json({ message: "delete", databases: databases.databases });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "admin error" });

  }
});



app.get("/", async (req, res, next) => {
  res.status(200).json({ message: "get only the address" });
});

// fuser -n tcp -k 8080`