const Message = require("../models/Message");
const { Server } = require("socket.io");

const onlineUsers = new Map();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://nearby-vcri.vercel.app"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("setup", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online_users", Array.from(onlineUsers.keys()));
      console.log(`User ${userId} is online`);
    });

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`User joined private room: ${chatId}`);
    });

    socket.on("send_message", async (msgData) => {
      try {
        const savedMsg = await Message.create({
          chatId: msgData.chatId,
          senderId: msgData.senderId,
          receiverId: msgData.receiverId,
          text: msgData.text,
          isRead: false
        });

        socket.to(msgData.chatId).emit("receive_message", savedMsg);
        const receiverSocketId = onlineUsers.get(msgData.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("new_message_alert", savedMsg);
        }
      } catch (error) {
        console.log("Message save error", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });
  });

  return io;
};

module.exports = { initSocket };