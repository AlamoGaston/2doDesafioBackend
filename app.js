const express = require("express");
const logger = require("morgan");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
require("dotenv").config();

const mongoose = require("mongoose");
const MessageDAOMongoDB = require("./daos/MessageDAOMongoDB");

const util = require("util");
const normalizr = require("normalizr");
const { normalize, denormalize, schema } = require("normalizr");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.set("views", "./views");
app.set("view engine", "ejs");

let users = [];

//CRUD db
const { selectAllProducts } = require("./src/db/selectAllProducts");
const { insertProduct } = require("./src/db/insertProducts");

//Routers import
const chatRouter = require("./src/routes/chatRouter");
const fakerRouter = require("./src/routes/fakerRouter");
const formRouter = require("./src/routes/formRouter");
const homeRouter = require("./src/routes/homeRouter");
const indexRouter = require("./src/routes/index");
const loginRouterGet = require("./src/routes/loginRouterGet");
const loginRouterPost = require("./src/routes/loginRouterPost");

//Routers
app.use("/chat", chatRouter);
app.use("/api/productos-test", fakerRouter);
app.use("/form", formRouter);
app.use("/", homeRouter);
app.use("/api", indexRouter);
app.use("/login", loginRouterGet);
app.use("/login", loginRouterPost);

//Instancia contenedores:
const storageMessages = new MessageDAOMongoDB();

//socket Products
io.on("connection", (socket) => {
  socket.on("sendProduct", async () => {
    try {
      const allProductsFromDB = await selectAllProducts();

      //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
      socket.emit("allProducts", allProductsFromDB);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });

  socket.on("addProducts", async (data) => {
    try {
      const newProducto = {
        title: `${data.name}`,
        price: Number(data.price),
        thumbnail: `${data.img}`,
      };

      const product = await insertProduct(newProducto);

      //Envio el producto nuevo a todos los clientes conectados
      io.sockets.emit("refreshTable", [product]);
    } catch (err) {
      console.log(`Error ${err}`);
    }
  });
});

//socket chat
io.on("connection", (socket) => {
  //Cliente --> Servidor: joinChat event
  socket.on("joinChat", async ({ userName }) => {
    users.push({
      id: socket.id,
      userName: userName,
      avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png",
    });

    //Servidor --> Cliente : bienvenida al usuario que se conecta.
    socket.emit("notification", `Bienvenido ${userName}`);

    try {
      //const allMessageFromDB = await selectAllMessage();
      const allMessageFromDB = await storageMessages.getAll();

      const dataJson = {
        id: 1,
        mensajes: [
          {
            id: "gaston@live.ar",
            author: {
              id: "gaston@live.ar",
              nombre: "Nombre del usuario",
              apellido: "apellido del usuario",
              alias: "alias del usuario",
              edad: 30,
              avatar: "avatar del usuario",
            },
            text: {
              id: "a",
              mensaje: "mensaje 1",
            },
          },
          {
            id: "franco@hotmail.ar",
            author: {
              id: "franco@hotmail.ar",
              nombre: "Nombre del usuario",
              apellido: "apellido del usuario",
              alias: "alias del usuario",
              edad: 29,
              avatar: "avatar del usuario",
            },
            text: {
              id: "b",
              mensaje: "mensaje 2",
            },
          },
          {
            id: "gaston@live.ar",
            author: {
              id: "gaston@live.ar",
              nombre: "Nombre del usuario",
              apellido: "apellido del usuario",
              alias: "alias del usuario",
              edad: 30,
              avatar: "avatar del usuario",
            },
            text: {
              id: "c",
              mensaje: "mensaje 3",
            },
          },
          {
            id: "franco@hotmail.ar",
            author: {
              id: "franco@hotmail.ar",
              nombre: "Nombre del usuario",
              apellido: "apellido del usuario",
              alias: "alias del usuario",
              edad: 29,
              avatar: "avatar del usuario",
            },
            text: {
              id: "d",
              mensaje: "mensaje 4",
            },
          },
          {
            id: "franco@hotmail.ar",
            author: {
              id: "franco@hotmail.ar",
              nombre: "Nombre del usuario",
              apellido: "apellido del usuario",
              alias: "alias del usuario",
              edad: 29,
              avatar: "avatar del usuario",
            },
            text: {
              id: "e",
              mensaje: "mensaje 5",
            },
          },
          {
            id: "tomas@hotmail.ar",
            author: {
              id: "tomas@hotmail.ar",
              nombre: "Nombre del usuario",
              apellido: "apellido del usuario",
              alias: "alias del usuario",
              edad: 20,
              avatar: "avatar del usuario",
            },
            text: {
              id: "f",
              mensaje: "mensaje 6",
            },
          },
        ],
      };

      // Se tendrìa que leer de la DB y enviar a la funcionar normalizar dicha información.
      normalizar(dataJson);

      //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
      socket.emit("allMenssage", allMessageFromDB);
    } catch (err) {
      console.log(`Error ${err}`);
    }

    //Servidor --> Cliente : bienvenida a todos los usuarios menos al que inicio la conexión:
    socket.broadcast.emit("notification", `${userName} se ha unido al chat`);

    //Servidor --> cliente: enviamos a todos los usuarios la lista actualizada de participantes:
    io.sockets.emit("users", users);
  });

  //Cliente --> Servidor: messageInput event
  socket.on("messageInput", async (data) => {
    const user = users.find((user) => user.id === socket.id);

    const newMessage = {
      id: user.userName,
      author: {
        id: user.userName,
        nombre: "Hard-code: Nombre del usuario",
        apellido: "Hard-code: Apellido del usuario",
        edad: "Hard-code: Edad",
        alias: "Hard-code: alias del usuario",
        avatar: "Hard-code: url avatar",
      },
      text: {
        id: mongoose.Types.ObjectId().toString(),
        mensaje: data,
      },
    };

    await storageMessages.save(newMessage);

    //Servidor --> Cliente: envio mensaje
    socket.emit("message", newMessage);

    socket.broadcast.emit("message", newMessage);

    //await insertMessage(newMessage);
  });

  // Cliente --> Servidor: un cliente se desconecta.
  socket.on("disconnect", (reason) => {
    const user = users.find((user) => user.id === socket.id);
    users = users.filter((user) => user.id !== socket.id);

    if (user) {
      socket.broadcast.emit(
        "notification",
        `${user.userName} se ha ido del chat`
      );
    }

    io.sockets.emit("users", users);
  });
});

const print = (objeto) => {
  console.log(util.inspect(objeto, false, 12, true));
};

const normalizar = (inMessage) => {
  const authorSchema = new normalizr.schema.Entity("author");

  const textSchema = new normalizr.schema.Entity("text");

  const mensajeSchema = new normalizr.schema.Entity("mensaje", {
    author: authorSchema,
    mensaje: textSchema,
  });

  constchatSchema = new normalizr.schema.Entity("chat", {
    mensajes: [mensajeSchema],
  });

  const normalizedChat = normalizr.normalize(inMessage, constchatSchema);
  const denormalizedChat = normalizr.denormalize(
    normalizedChat.result,
    constchatSchema,
    normalizedChat.entities
  );

  console.log("==== OBJETO ORIGINAL ====");
  console.log(`Tamaño [bytes]: ${JSON.stringify(inMessage).length}`);
  print(inMessage);

  console.log("==== OBJETO NORMALIZADO ====");
  console.log(`Tamaño [bytes]: ${JSON.stringify(normalizedChat).length}`);
  print(normalizedChat);

  console.log("==== OBJETO DENORMALIZADO ====");
  console.log(`Tamaño [bytes]: ${JSON.stringify(denormalizedChat).length}`);
  print(denormalizedChat);

  const poPercent = Math.floor(
    (JSON.stringify(normalizedChat).length * 100) /
      JSON.stringify(denormalizedChat).length
  );

  console.log(`Porcentaje de compresion: ${100 - poPercent}%`);
};

module.exports = httpServer;
