const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const passport = require('passport');
const userRoutes = require("./routes/user_routes");
const ticketRoutes = require("./routes/ticket_routes");
require("./helpers/routeProtect")(passport);

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
  
//veryfying connection
db.once("open", (_) => {
    console.log("database connected:");
});
  
db.on("error", (err) => {
    console.error("connection failed:", err);
});

//middleware
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use("/", userRoutes);
app.use("/", ticketRoutes);

app.listen(port, () => {
    console.log("Server is running...");
});

app.get("/", (req, res) => {
    res.send("I am home");
});