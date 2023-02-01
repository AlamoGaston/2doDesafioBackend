const app = require("./app");
//const PORT = process.env.PORT || 3000;
const parseArgs = require(`minimist`);
const args = parseArgs(process.argv.slice(2));

const FORK = args.FORK;
const CLUSTER = args.CLUSTER;

const PORT = args.p || 8080;
const runServer = (PORT) => {
  httpServer.listen(PORT, () =>
    console.log(`Servidor escuchando el puerto ${PORT}`)
  );
};

//app.listen(PORT, () => console.info(`Server up and run on port ${PORT}`));
