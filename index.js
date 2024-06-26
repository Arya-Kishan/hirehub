const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload")
require('dotenv').config()
const path = require("path");

require('./mongoDB')

const PORT = process.env.PORT || 8080
const userRouter = require("./routes/UserRoute")
const jobRouter = require("./routes/JobRoute")
const postRouter = require("./routes/PostsRoutes")
const notificationRouter = require("./routes/NotificationRoute")
const applicationRouter = require("./routes/ApplicationRoute");
const blogRouter = require("./routes/BlogRoute");
const chatRouter = require("./routes/ChatRoutes");
const { jwtAuthenticateUser } = require('./middlewares/Authenticate');

const server = express()

server.use(cors({
  exposedHeaders: ["X-jwt-routes", "X-Total-Count", "x-total-post"]
}));
server.use(express.json());
server.use(express.urlencoded({ extended: false }))
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


server.use("/user", userRouter)
server.use("/job", jwtAuthenticateUser, jobRouter)
server.use("/application", jwtAuthenticateUser, applicationRouter)
server.use("/application", jwtAuthenticateUser, applicationRouter)
server.use("/post", jwtAuthenticateUser, postRouter)
server.use("/notification", jwtAuthenticateUser, notificationRouter)
server.use("/blog", jwtAuthenticateUser, blogRouter)
server.use("/chat", chatRouter)


server.use("/", (req, res) => {
  res.status(200).json({ "message": "NORMAL ROUTE" })
})


server.listen(PORT, () => {
  console.log(`SERVER LISTENED AT 8080`);
})
