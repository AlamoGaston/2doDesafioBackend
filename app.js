const express = require("express");
const logger = require("morgan");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
require("dotenv").config();

const mongoose = require("mongoose");
const MessageDAOMongoDB = require("./daos/MessageDAOMongoDB");

const faker = require("faker");

const util = require("util");

const parseArgs = require(`minimist`);

const MongoStore = require(`connect-mongo`);

const session = require(`express-session`);

const { Router } = require("express");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("tiny"));

app.set("views", "./views");
app.set("view engine", "ejs");

//------------------------------------- args ----------------------------------------//

const args = parseArgs(process.argv.slice(2));

// const PORT = args.p || 8080;
// httpServer.listen(PORT, () => console.log(`Servidor escuchando el puerto ${PORT}`));

//------------------------------------- args ----------------------------------------//

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

const router = Router();

// ----------------------------------- Desafio 13 ----------------------------
const flash = require("connect-flash");

const { createHash, isValidPassword } = require("./src/utils/utils");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UserModel = require("./src/db/models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/desafio13",
      ttl: 10,
      mongoConfig,
    }),
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

/*
    strategySignup:
    passport por defecto toma el username & password de req.body.username, req.body.password,
    en nuestro modelo para ingresar a la DB tenemos también email, entonces, para obtener el
    email indicamos que queremos recibir todo el req.
*/

passport.use(
  "login",
  new LocalStrategy(
    {
      //Configuración para obtener todo el req.
      passReqToCallback: true,
    },
    async (_req, username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });
        if (!user) {
          return done(null, false);
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      //Configuración para obtener todo el req.
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });
        if (user) {
          return done(null, false);
        }

        const newUser = new UserModel();
        newUser.username = username;
        newUser.password = createHash(password); //No se puede volver a conocer la contraseña luego de realizarle el hash
        newUser.email = req.body.email;

        const userSave = await newUser.save();

        return done(null, userSave);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser");
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/login2", (req, res) => {
  return res.render("loginSession");
});

app.get("/signup2", (req, res) => {
  return res.render("signup");
});

app.get("/bienvenida", (req, res) => {
  userLog = req.user.username;
  res.render("bienvenida", { userLog });
});

app.get("/errorLog", (req, res) => {
  res.render("errorLog");
});

app.get("/errorSignup", (req, res) => {
  res.render("errorSignup");
});

app.get("/logout", (req, res) => {
  if (req.user) {
    userLogout = req.user.username;
    res.render("logout", { userLogout });
    req.session.destroy((err) => {
      if (!err) {
        console.log("ok");
      } else {
        console.log("error");
      }
    });
  }
  res.render("errorLog");
});

app.post(
  "/login2",
  passport.authenticate("login", {
    //indicamos el controlador de passport, llega desde el formulario de login.
    successRedirect: "/bienvenida", //redirect es con método get, vamos a home.
    failureRedirect: `/errorLog`, // redirect es con método get, vamos a /login de get.
    failureFlash: true, // nos permite enviar mensajes.
  })
);

app.post(
  "/signup2",
  passport.authenticate("signup", {
    //indicamos el controlador de passport, llega desde el formulario de signup.
    successRedirect: "/", // redirect es con método get, vamos a home.
    failureRedirect: "/errorSignup", // redirect es con método get, vamos a /signup de signup.
    failureFlash: true, // nos permite enviar mensajes.
  })
);

//-------------------------------- -------- ----------------------------------------//

//-------------------------------- Desafio 14 ----------------------------------------//

const dotenv = require("dotenv");
require("dotenv").config();

const { fork } = require("child_process");

app.get("/info", (_req, res) => {
  const data = {
    directActual: process.cwd(),
    idProcess: process.pid,
    versionNode: process.version,
    routeEjec: process.execPath,
    opSys: process.platform,
    cantProcesadores: numCPUs,
    memory: JSON.stringify(process.memoryUsage().rss, null, 2),
  };
  res.render("info", data);
});

app.get("/api/randoms", (_req, res) => {
  res.render("objectRandomIN");
});

app.post("/api/randoms", (req, res) => {
  const { cantBucle } = req.body;
  process.env.CANT_BUCLE = cantBucle;

  const objectRandom = fork("./controller/getObjectRandom");
  objectRandom.on("message", (dataRandom) => {
    return res.send(dataRandom);
  });
});

app.get("/objectRandomOut", (_req, res) => {
  res.render("onjectRandomOUT");
});

//-------------------------------- ----------------------------------------------//

// ----------------------------------- Desafio 15 ----------------------------
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const FORK = args.FORK;
const CLUSTER = args.CLUSTER;

const PORT = args.p || 8080;
const runServer = (PORT) => {
  httpServer.listen(PORT, () =>
    console.log(`Servidor escuchando el puerto ${PORT}`)
  );
};

if (CLUSTER) {
  if (cluster.isMaster) {
    console.log(`Nodo primario ${process.pid} corriendo`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} finalizado`);
      cluster.fork();
    });
  } else {
    console.log(`Nodo Worker corriendo en el proceso ${process.pid}`);
    runServer(PORT);
  }
} else {
  runServer(PORT);
}

// -------------------------------------------------------------------------------------//

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
io.on("connection", (socket, res) => {
  //Cliente --> Servidor: joinChat event
  socket.on("joinChat", async ({ aliasName }) => {
    users.push({
      id: socket.id,
      aliasName: aliasName,
      avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png",
    });

    //Servidor --> Cliente : bienvenida al usuario que se conecta.
    socket.emit("notification", `Bienvenido ${aliasName}`);

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

      //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
      socket.emit("allMenssage", allMessageFromDB);
    } catch (err) {
      console.log(`Error ${err}`);
    }

    //Servidor --> Cliente : bienvenida a todos los usuarios menos al que inicio la conexión:
    socket.broadcast.emit("notification", `${aliasName} se ha unido al chat`);

    //Servidor --> cliente: enviamos a todos los usuarios la lista actualizada de participantes:
    io.sockets.emit("users", users);
  });

  //Cliente --> Servidor: messageInput event
  socket.on("messageInput", async (data) => {
    const user = users.find((user) => user.id === socket.id);

    const newMessage = {
      id: user.aliasName,
      author: {
        id: user.aliasName,
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
  });

  // Cliente --> Servidor: un cliente se desconecta.
  socket.on("disconnect", (reason) => {
    const user = users.find((user) => user.id === socket.id);
    users = users.filter((user) => user.id !== socket.id);

    if (user) {
      socket.broadcast.emit(
        "notification",
        `${user.aliasName} se ha ido del chat`
      );
    }

    io.sockets.emit("users", users);
  });
});

module.exports = httpServer;
