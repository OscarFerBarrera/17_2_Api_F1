const express = require("express");
const fs = require("fs");

const PORT = 3000;
const server = express();
const router = express.Router();
const pilotosFilePath = "./docs/pilotos.json";

// Configuración del server
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  fs.readFile("./templates/index.html", "utf-8", (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      res.set("Content-Type", "text/html");
      res.send(data)
    }
  });
});

router.get("/f1-driver", (req, res) => {
  fs.readFile(pilotosFilePath, (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      const pilotos = JSON.parse(data);
      res.json(pilotos);
    }
  });
});

router.post("/f1-driver", (req, res) => {
  // Leemos el fichero pokemons
  fs.readFile(pilotosFilePath, (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      const pilotosF1 = JSON.parse(data);
      const newPilotoF1 = req.body;
      const lastId = pilotosF1[pilotosF1.length - 1].id;
      newPilotoF1.id = lastId + 1;
      pilotosF1.push(newPilotoF1);

      // Guardamos fichero
      fs.writeFile(pilotosFilePath, JSON.stringify(pilotosF1), (error) => {
        if (error) {
          res.status(500).send("Error inesperado");
        } else {
          res.json(newPilotoF1);
        }
      });
    }
  });
});

router.get("/f1-driver/:id", (req, res) => {
  fs.readFile(pilotosFilePath, (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      const id = parseInt(req.params.id);
      const pilotos = JSON.parse(data);
      const piloto = pilotos.find((piloto) => piloto.id === id);

      if (piloto) {
        res.json(piloto);
      } else {
        res.status(404).send("Piloto no encontrado.");
      }
    }
  });
});

server.use("/", router);

server.listen(PORT, () => {
  console.log(`Servidor está levantado y escuchando en el puerto ${PORT}`);
});
