const express = require("express");
const cors = require("cors");
const config = require("./config");
const eventRoutes = require('./routes/event-routes');

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use('/api', eventRoutes.routes);

app.listen(config.port, () => console.log(`App is listening on ${config.url}`))