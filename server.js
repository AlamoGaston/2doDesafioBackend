const express = require("express");
//const path = require("path");
const logger = require("morgan");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
require("dotenv").config();

const app = express();
const http = new HttpServer(app);
const io = new IOServer(http);

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.set("views", "./views");
app.set("view engine", "ejs");

const ContenedorP = require("./contenedor.js");
const ContenedorC = require(`./contenedorChat.js`);
let contenedorProductos = new ContenedorP("./Products.txt");
let contenedorChat = new ContenedorC(`./messages.txt`);

let users = [];

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    environment: process.env.ENVIRONMENT || "Undefined",
    health: "UP!",
  });
});

app.get(`/`, (_req, res) => {
  const data = {
    title: "Desafio Nº6 - Websockets",
    content: "En la web se podrán ingresar productos, verlos y chatear",
  };
  return res.render(`index`, data);
});

app.get(`/form`, (_req, res) => res.render(`products`));

app.get(`/login`, (_req, res) => res.render(`login`));

app.post(`/login`, (req, res) => {
  const { userName } = req.body;

  return res.redirect(`/chat?userName=${userName}`);
});

app.get(`/chat`, (_req, res) => res.render("chat"));

//Evento de conexión cliente
io.on(`connection`, (socket) => {
  // ***************************************
  // ********* socket formProductos ********
  // ***************************************

  socket.on(`sendProduct`, () => {
    (async () => {
      try {
        allProducts = await contenedorProductos.getAll();

        //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
        socket.emit(`allProducts`, allProducts);
      } catch (err) {
        return res.status(404).json({
          error: `Error ${err}`,
        });
      }
    })();
  });

  socket.on(`addProducts`, (data) => {
    (async () => {
      const newProducto = {
        title: `${data.name}`,
        price: Number(data.price),
        thumbnail: `${data.img}`,
      };
      const id = await contenedorProductos.save(newProducto);

      const product = await contenedorProductos.getById(id);

      //Envio el producto nuevo a todos los clientes conectados
      io.sockets.emit(`refreshTable`, product);
    })();
  });

  // ***********************************
  // *********** socket chat ***********
  // ***********************************

  //Cliente --> Servidor: joinChat event
  socket.on(`joinChat`, ({ userName }) => {
    (async () => {
      users.push({
        id: socket.id,
        userName: userName,
        avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png",
      });

      //Servidor --> Cliente : bienvenida al usuario que se conecta.
      socket.emit(`notification`, `Bienvenido ${userName}`);

      try {
        allMessage = await contenedorChat.getAll();
        //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
        socket.emit(`allMenssage`, allMessage);
      } catch (err) {
        return res.status(404).json({
          error: `Error ${err}`,
        });
      }

      //Servidor --> Cliente : bienvenida a todos los usuarios menos al que inicio la conexión:
      socket.broadcast.emit(`notification`, `${userName} se ha unido al chat`);

      //Servidor --> cliente: enviamos a todos los usuarios la lista actualizada de participantes:
      io.sockets.emit(`users`, users);
    })();
  });

  //Cliente --> Servidor: messageInput event
  socket.on(`messageInput`, (data) => {
    (async () => {
      const now = new Date();
      const user = users.find((user) => user.id === socket.id);
      const message = {
        text: data,
        time: `${now.getHours()}:${now.getMinutes()}`,
        user,
      };

      //Servidor --> Cliente: envio mensaje
      socket.emit(`message`, message);

      socket.broadcast.emit(`message`, message);

      await contenedorChat.save(message);
    })();
  });

  // Cliente --> Servidor: un cliente se desconecta.
  socket.on("disconnect", (reason) => {
    const user = users.find((user) => user.id === socket.id);
    users = users.filter((user) => user.id !== socket.id);

    if (user) {
      socket.broadcast.emit(
        `notification`,
        `${user.userName} se ha ido del chat`
      );
    }

    io.sockets.emit(`users`, users);
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));
