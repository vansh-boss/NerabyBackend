const { Server } = require("socket.io");

function initSocket(server) {

  const io = new Server(server, {

    cors: {
      origin: "https://nearby-vcri.vercel.app",
      methods: ["GET", "POST"]
    }

  });

  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("send_message", (data) => {
      io.to(data.chatId).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });

}

module.exports = initSocket;