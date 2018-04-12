const express = require("express");
const router = express.Router();

const users =require("./users")
const lessons = require("./lessons")
const imageUploder = require("./imageUploder")
router.use("/", imageUploder)
router.use("/", lessons);
router.use("/", users);


module.exports = router;
