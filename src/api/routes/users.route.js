const express = require("express");
const { usersValidation } = require("../validations");
const {
  usersMiddleware,
  authMiddleware,
  permissionMiddleware,
} = require("../middlewares");
const { usersController } = require("../controllers");
const router = express.Router();

router.post(
  "/user-list",
  authMiddleware.isAuth,
  permissionMiddleware.adminPermission,
  usersController.getUsers
);
router.post(
  "/user-detail",
  authMiddleware.isAuth,
  permissionMiddleware.adminPermission,
  usersController.getUsersDetail
);
router.post(
  "/login",
  usersValidation.loginValidation,
  usersMiddleware.checkUserExist,
  usersController.login
);
router.post(
  "/register",
  usersValidation.registerValidation,
  usersMiddleware.checkUsernameExist,
  usersMiddleware.checkEmailExist,
  usersController.register
);
router.post(
  "/update-role",
  authMiddleware.isAuth,
  permissionMiddleware.superAdminPermission,
  usersController.updateRole
);
router.post(
  "/self-update",
  authMiddleware.isAuth,
  usersValidation.selfUpdateValidation,
  usersMiddleware.checkEmailExistSelfUpdate,
  usersMiddleware.checkUsernameExistSelfUpdate,
  usersMiddleware.verifySelfUpdate,
  usersController.selfUpdate
);
router.post(
  "/change-password",
  authMiddleware.isAuth,
  usersValidation.changePasswordValidation,
  usersMiddleware.checkUserExistChangePassword,
  usersController.changePassword
);
router.post(
  "/delete-user",
  authMiddleware.isAuth,
  permissionMiddleware.superAdminPermission,
  usersController.deleteUser
);
router.post(
  "/restore-user",
  authMiddleware.isAuth,
  permissionMiddleware.superAdminPermission,
  usersController.restoreUser
);

module.exports = router;
