const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload")
require('dotenv').config()
const path = require("path");
const PORT = process.env.PORT || 8080
const userRouter = require("./routes/UserRoute")
const jobRouter = require("./routes/JobRoute")
const applicationRouter = require("./routes/ApplicationRoute")
require('./mongoDB')

const server = express()

server.use(cors())
server.use(express.json());
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
server.use(express.static(path.join(__dirname, 'dist')));


server.use("/user", userRouter)
server.use("/job", jobRouter)
server.use("/application", applicationRouter)


server.use("/", (req, res) => {
  res.status(200).json({ "message": "NORMAL ROUTE" })
})


server.listen(PORT, () => {
  console.log(`SERVER LISTENED AT 8080`);
})
