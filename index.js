"use strict";
const express = require("express");

const servidor = express();

servidor.use(express.static("./estaticos"));

const puerto = process.env.PORT || 4000;

servidor.listen(puerto, () => {
    console.log("Servidor Activo");
});