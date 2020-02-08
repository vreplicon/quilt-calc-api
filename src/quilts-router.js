const express = require("express");
const QuiltsService = require("./quilts-service");
const FabricService = require("./fabric-service");

const quiltsRouter = express.Router();
const jsonParser = express.json();

quiltsRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  FabricService.getAllFabric(knexInstance)
    .then(fabric => {
      req.fabric = fabric;
    })
    .then(() => QuiltsService.getAllQuilts(knexInstance))
    .then(quilts => {
      return quilts.map(x => QuiltsService.groupFabric(x, req.fabric));
    })
    .then(quilts => {
      res.json(quilts);
    })
    .catch(next);
});

quiltsRouter.route("/thing").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  FabricService.test(knexInstance)
    .then(lookups => {
      res.json(lookups);
    })
    .catch(next);
});

module.exports = quiltsRouter;
