const dao = require("../dao/factory.js");

const createMessage = async (messageData) => {
  return await dao.dtoChat.createMsg(messageData);
};

module.exports = { createMessage };