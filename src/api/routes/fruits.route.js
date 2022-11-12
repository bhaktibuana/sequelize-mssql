const express = require("express");
const { fruitsValidation } = require("../validations");
const {
  authMiddleware,
  permissionMiddleware,
  fruitsMiddleware,
} = require("../middlewares");
const { fruitsController } = require("../controllers");
const router = express.Router();

router.get("/", authMiddleware.isAuth, fruitsController.getData);
router.post(
  "/",
  authMiddleware.isAuth,
  permissionMiddleware.adminPermission,
  fruitsValidation.createDataValidation,
  fruitsController.createData
);
router.put(
  "/delete-fruit",
  authMiddleware.isAuth,
  permissionMiddleware.adminPermission,
  fruitsMiddleware.checkFruitExist,
  fruitsController.deleteData
);
router.put(
  "/restore-fruit",
  authMiddleware.isAuth,
  permissionMiddleware.adminPermission,
  fruitsMiddleware.checkFruitExist,
  fruitsController.restoreData
);
router.put(
  "/",
  authMiddleware.isAuth,
  permissionMiddleware.adminPermission,
  fruitsMiddleware.checkFruitExist,
  fruitsValidation.updateDataValidation,
  fruitsController.updateData
);

module.exports = router;
