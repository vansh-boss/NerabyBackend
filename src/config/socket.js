const { Server } = require("socket.io");

function initSocket(server) {
  const io = new Server(server, {
  cors: {
    origin: "https://your-frontend.vercel.app",
    methods: ["GET", "POST"]
  }
});

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // join chat room
    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
    });

    // send message (ONLY ONE TIME EMIT)
    socket.on("send_message", (data) => {
      io.to(data.chatId).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initSocket;