const express = require("express");
const logger = require("morgan");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
require("dotenv").config();

const passport = require("passport");

const mongoose = require("mongoose");
const MessageDAOMongoDB = require("./daos/MessageDAOMongoDB");

const faker = require("faker");

const util = require("util");

const parseArgs = require("minimist");

const MongoStore = require("connect-mongo");

const session = require("express-session");

const { Router } = require("express");

const log4js = require("./src/utils/logs");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("tiny"));

const login = require("./authentication/login");
const signup = require("./authentication/signup");
const serializeUser = require("./authentication/serializeUser");
const deserializeUser = require("./authentication/deserializeUser");

app.set("views", "./views");
app.set("view engine", "ejs");

const socketIoChat = require("./src/sockets/socketChat");
const socketIoProducts = require("./src/sockets/socketProducts");

//------------------------------------- args ----------------------------------------//

const args = parseArgs(process.argv.slice(2));

// const PORT = args.p || 8080;
// httpServer.listen(PORT, () => console.log(`Servidor escuchando el puerto ${PORT}`));

//------------------------------------- args ----------------------------------------//

const loggerConsole = log4js.getLogger("default");
const loggerArchiveWarn = log4js.getLogger("warnArchive");
const loggerArchiveError = log4js.getLogger("errorArchive");

// Servidor: modo CLUSTER / FORK
//nodemon server --> ejecuta en puerto 8080
//nodemon server -p xxxx --> ejecuta en puerto xxxx

const cluster = require(`cluster`);
const numCPUs = require(`os`).cpus().length;

const CLUSTER = args.CLUSTER;

const PORT = args.p || 8080;
const runServer = (PORT) => {
  httpServer.listen(PORT, () =>
    loggerConsole.debug(`Servidor escuchando el puerto ${PORT}`)
  );
};

if (CLUSTER) {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on(`exit`, (worker, code, signal) => {
      cluster.fork();
    });
  } else {
    runServer(PORT);
  }
} else {
  runServer(PORT);
}

//Middlewares
app.use((req, _res, next) => {
  loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);
  next();
});

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/desafio16",
      ttl: 10,
    }),
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Authentication
login();
signup();
serializeUser();
deserializeUser();

let users = [];

//CRUD db
const { selectAllProducts } = require("./src/db/selectAllProducts");
const { insertProduct } = require("./src/db/insertProducts");

//Routers import

const chatRouter = require("./src/routes/chatRouter");
const fakerRouter = require("./src/routes/fakerRouter");
const infoRouter = require("./src/routes/infoRouter");
const formRouter = require("./src/routes/formRouter");
const homeRouter = require("./src/routes/homeRouter");
const indexRouter = require("./src/routes/index");
const loginRouterGet = require("./src/routes/loginRouterGet");
const loginRouterPost = require("./src/routes/loginRouterPost");
const infoRouterCompression = require("./src/routes/infoRouterCompression");
const objectRandomRouterGET = require("./src/routes/objectRandomGETRouter");
const objectRandomRouterPOST = require("./src/routes/objectRandomPOSTRouter");
const objectRandomRouterOUT = require("./src/routes/objectRandomOUTRouter");
const login2RouterGet = require("./src/routes/login2RouterGet");
const signup2Router = require("./src/routes/signup2Router");
const bienvenidaRouter = require("./src/routes/bienvenidaRouter");
const errorLogRouter = require("./src/routes/errorLogRouter");
const errorSignupRouter = require("./src/routes/errorSignupRouter");
const logoutRouter = require("./src/routes/logoutRouter");

//Routers
app.use("/chat", chatRouter);
app.use("/api/productos-test", fakerRouter);
app.use("/info", infoRouter);
app.use("/form", formRouter);
app.use("/", homeRouter);
app.use("/api", indexRouter);
app.use("/login", loginRouterGet);
app.use("/login", loginRouterPost);
app.use("/infoCompression", infoRouterCompression);
app.use("/api/randoms", objectRandomRouterGET);
app.use("/api/randoms", objectRandomRouterPOST);
app.use("/objectRandomOUT", objectRandomRouterOUT);
app.use("/login2", login2RouterGet);
app.use("/signup2", signup2Router);
app.use("/bienvenida", bienvenidaRouter);
app.use("/errorLog", errorLogRouter);
app.use("/errorSignup", errorSignupRouter);
app.use("/logout", logoutRouter);

//Instancia contenedores:
const storageMessages = new MessageDAOMongoDB();

const router = Router();

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

//Socket products:
socketIoChat(io);

//Socket chat:
socketIoProducts(io);

//Middlewares
app.use((req, res, next) => {
  loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);

  loggerArchiveWarn.warn(
    `Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`
  );

  res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`,
  });
  next();
});

module.exports = httpServer;
