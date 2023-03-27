const MessageDTO = require("../../../DTOs/MessageDTO");

class Contenedor {
  constructor(mongoDB, messageModel) {
    this.mongoDB = mongoDB;
    this.messageModel = messageModel;
  }

  async save(message) {
    try {
      // Instancia del modelo message
      const newMessage = new this.messageModel(message);

      console.log("I'm from MongoDB");

      this.mongoDB
        .then((_) => newMessage.save())
        .catch((err) => console.log(`Error: ${err.message}`));
    } catch (error) {
      throw Error("Error in save");
    }
  }

  async getAll() {
    try {
      /*
            Esta lógica va en Repository:

            const messages = await this.messageModel.find();
            const messageDTO = messages.map(message => new MessageDTO(message));
            */
      const messages = await this.messageModel.find();
      const messageDTO = messages.map((message) => new MessageDTO(message));

      if (messageDTO) {
        return messageDTO;
      } else {
        return false;
      }
    } catch (error) {
      throw Error("Error in getAll");
    }
  }
}

module.exports = Contenedor;
