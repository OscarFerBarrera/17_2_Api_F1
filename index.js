const express = require("express");
const fs = require("fs");

const PORT = 3000;
const server = express();
const router = express.Router();
const pilotosF1 = "./docs/pilotos.json";

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
  fs.readFile(pilotosF1, (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      const pilotos = JSON.parse(data);
      res.json(pilotos);
    }
  });
});

// router.post("/pokemon", (req, res) => {
//   // Leemos el fichero pokemons
//   fs.readFile(pilotosF1, (error, data) => {
//     if (error) {
//       res.status(500).send("Error inesperado");
//     } else {
//       const pokemons = JSON.parse(data);
//       const newPokemon = req.body;
//       const lastId = pokemons[pokemons.length - 1].id;
//       newPokemon.id = lastId + 1;
//       pokemons.push(newPokemon);

//       // Guardamos fichero
//       fs.writeFile(pilotosF1, JSON.stringify(pokemons), (error) => {
//         if (error) {
//           res.status(500).send("Error inesperado");
//         } else {
//           res.json(newPokemon);
//         }
//       });
//     }
//   });
// });

// router.get("/pokemon/:id", (req, res) => {
//   fs.readFile(pilotosF1, (error, data) => {
//     if (error) {
//       res.status(500).send("Error inesperado");
//     } else {
//       const id = parseInt(req.params.id);
//       const pokemons = JSON.parse(data);
//       const pokemon = pokemons.find((pokemon) => pokemon.id === id);

//       if (pokemon) {
//         res.json(pokemon);
//       } else {
//         res.status(404).send("Pokemon con encontrado.");
//       }
//     }
//   });
// });

server.use("/", router);

server.listen(PORT, () => {
  console.log(`Servidor está levantado y escuchando en el puerto ${PORT}`);
});
