const chatService = require("../services/chat.service.js");

const msgChat = async (req, res) => {
  try {
    const chat = req.body;
    const msgCreated = await chatService.createMessage(chat);
    req.logger.info("Mensagem criada com sucesso");
    return res.render("msgSent", { name: msgCreated.name });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const renderChat = (req, res) => {
  res.render("chat");
};

module.exports = { msgChat, renderChat };