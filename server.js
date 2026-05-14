const http = require("http");

const app = require("./app");

const connectDB =
require("./src/config/db");

const {
  initSocket
} = require("./src/config/socket");

connectDB();

const server =
http.createServer(app);

// SOCKET INIT
const io =
initSocket(server);

// APP ME SAVE
app.set("io", io);

const PORT =
process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server Running On ${PORT}`
  );

});