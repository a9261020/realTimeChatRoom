const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("hello");
});

const port = process.env.PORT || 5000;

http.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is running on ${port}`);
});
