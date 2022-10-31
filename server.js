const app = require("../Desafio-5/EJS/appEjs");
//const app = require("../Desafio-5/PUG/appPug");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));
