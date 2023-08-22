const express = require("express");
const path = require('path');
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

// APIs CONTROLLERS.em
app.use("/api/signin", require("./controller/SignInController"));
app.use("/api/authenticatelogin", require("./controller/AuthenticateLoginController"));
app.use("/api/videoconverter", require("./controller/videoConvertercontroller"));
app.use("/api/crimedetection", require("./controller/CrimeDetectorController"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.on('error', (err) => {
    console.log(err.message);
});