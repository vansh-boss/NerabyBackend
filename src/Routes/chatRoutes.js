const router =
  require("express").Router();

const Message =
  require("../models/Message");

// GET CHAT HISTORY
router.get(
  "/:user1/:user2",
  async (req, res) => {

    try {

      const {
        user1,
        user2
      } = req.params;

      const messages =
        await Message.find({

          $or: [

            {
              senderId: user1,
              receiverId: user2
            },

            {
              senderId: user2,
              receiverId: user1
            }

          ]

        }).sort({
          createdAt: 1
        });

      res.json({
        messages
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to load chat"

      });

    }

  }
);

module.exports = router;