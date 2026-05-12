async function sendMessage(req, res) {

  const { message } = req.body;

  res.json({
    success: true,
    message
  });
}

async function getMessages(req, res) {

  res.json([
    {
      sender: "Vansh",
      text: "Hello"
    }
  ]);
}

module.exports = {
  sendMessage,
  getMessages
};