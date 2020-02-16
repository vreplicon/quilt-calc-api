const path = require("path");
const express = require("express");
const QuiltsService = require("./quilts-service");
const FabricService = require("./fabric-service");

const quiltsRouter = express.Router();
const jsonParser = express.json();

quiltsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    FabricService.getAllFabric(knexInstance)
      .then(fabric => {
        req.fabric = fabric;
      })
      .then(() => QuiltsService.getAllStandardQuilts(knexInstance))
      .then(quilts => {
        return quilts.map(x => QuiltsService.groupFabric(x, req.fabric));
      })
      .then(quilts => {
        res.json(quilts);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      quilt_name,
      width,
      height,
      border,
      block_width,
      block_height,
      class_name,
      standard_pattern,
      lookup_id,
      fabric
    } = req.body;
    const newQuilt = {
      quilt_name,
      width,
      height,
      border,
      block_width,
      block_height,
      class_name,
      standard_pattern,
      lookup_id
    };

    for (const [key, value] of Object.entries(newQuilt)) {
      if (value == null) {
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body`
          }
        });
      }
    }

    QuiltsService.addNewQuilt(req.app.get("db"), newQuilt)
      .then(quilt => (res.quilt = quilt))
      .then(() => (res.quilt.fabric = fabric))
      .then(() =>
        FabricService.addNewFabric(req.app.get("db"), fabric, res.quilt)
      )
      .then(() => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${res.quilt.lookup_id}`))
          .json(res.quilt);
      })
      .catch(next);
  });

quiltsRouter
  .route("/:lookup_id")
  .all((req, res, next) => {
    QuiltsService.getByLookupId(req.app.get("db"), req.params.lookup_id)
      .then(quilt => {
        if (!quilt) {
          return res.status(404).json(null);
        }
        res.quilt = quilt;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    FabricService.getAllFabric(knexInstance).then(fabric => {
      res.json(QuiltsService.groupFabric(res.quilt, fabric));
    });
  });
module.exports = quiltsRouter;
