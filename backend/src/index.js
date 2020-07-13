const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

app.use(bodyParser.json()); // Faz com que o express entenda as requisições com informações em json
app.use(bodyParser.urlencoded({ extended: false })); // Faz com que o express entenda parâmetros passados via URL (decode)
app.use("/documents", express.static("public/documents"));
app.use(cors());

require("./app/controllers")(app);

app.listen(3001);
