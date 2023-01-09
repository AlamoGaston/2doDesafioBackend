const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.info(`Server up and run on port ${PORT}`));
