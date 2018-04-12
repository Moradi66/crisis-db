const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyparser = require("body-parser");
const cors = require("cors");

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);
const router = express.Router();
router.use(cors());
router.use(bodyparser.json());

router.post("/register", function(req, res) {
  var sql = `insert into users
             (firstName, surName, userName, email, password)
             values (?, ?, ?, ?, ?)`;
  console.log(req.body);
  db.run(
    sql,
    [
      req.body.firstName,
      req.body.surName,
      req.body.userName,
      req.body.email,
      req.body.password
    ],
    (err, rows) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).json({
          users: rows
        });
      }
    }
  );
});

router.post('/login', function (req, res) {
  var sql = `select * from users where userName=? and password=?`;
  console.log(req.body)
  db.all(sql, [req.body.userName, req.body.password], (err, rows) => {
      if (err) {
          res.status(500).end();
        } else {
          res.status(200).json({
            status: rows.length === 1, rows
          });
        };
  });
});

module.exports = router;