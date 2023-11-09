const router = require("express").Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

const {
  userIdValidator,
  userDataValidator,
  userAvatarValidator,
} = require("../middlewares/validators/userValidator");

router.get("/me", getCurrentUser);
router.get("/:userId", userIdValidator, getUserById);
router.get("/", getUsers);
router.patch("/me", userDataValidator, updateUser);
router.patch("/me/avatar", userAvatarValidator, updateUserAvatar);

module.exports = router;
