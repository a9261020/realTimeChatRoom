const app = require("express")();
const http = require("http").Server(app);

// socket 模組化
// 參考 https://stackoverflow.com/questions/38511976/how-can-i-export-socket-io-into-other-modules-in-nodejs
const io = require("socket.io")(http);
require("./socket.js")(io);
const port = process.env.PORT || 5000;

http.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is running on ${port}`);
});
