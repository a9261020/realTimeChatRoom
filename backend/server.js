const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let users = [];
let messages = [];
let index = 0;

io.on("connection", socket => {
  socket.emit("login", {
    users: users.map(s => s.username),
    messages: messages
  });

  socket.on("newuser", username => {
    console.log(`hello ${username}`);
    socket.username = username;
    users.push(socket);

    io.emit("userOnline", socket.username);
  });

  socket.on("msg", msg => {
    let message = {
      index,
      username: socket.username,
      msg
    };

    messages.push(message);

    io.emit("msg", message);
    index++;
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} has left the party.`);
    io.emit("userLeft", socket.username);
    users.splice(users.indexOf(socket), 1);
  });
});

const port = process.env.PORT || 5000;

http.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is running on ${port}`);
});
