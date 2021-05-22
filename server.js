const app = require('./app');
const PORT = process.env.PORT || 5000;

//connect to db
require("./startup/db")();

//listen to server
const server = app.listen(PORT, () => console.log(`App runnin on PORT ${PORT}....`));

module.exports = server;
