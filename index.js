const express = require('express')
const var_dump = require('var_dump')
const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 8080

const defaultData = {
  members: [],
}

app.get('/', (req, res) => {
  res.send({ message: "Welcome to Cashpile's official API!" })
})

app.get('/createpile/:adminemail', (req, res) => {
  var con = mysql.createConnection({
    host: '68.66.226.92',
    user: 'rohanpat_tester_024895379284',
    password: 'ThisisaPassword',
    port: '3306',
    database: 'rohanpat_cashpile',
  })
  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    con.query(
      "INSERT INTO `simple_piles` (`pile_id`, `admin_email`, `data`) VALUES (NULL, '" +
        req.params.adminemail +
        "', '" +
        JSON.stringify(defaultData) +
        "');",
      function (err, result) {
        if (err) throw err
        var_dump(result[0])
        con.query('SELECT LAST_INSERT_ID();', function (err, result) {
          if (err) throw err
          var_dump(result[0])
          res.send({
            detail: 'Pile created for ' + req.params.adminemail,
            pile_id: String(result[0]['LAST_INSERT_ID()']).padStart(30, '0'),
          })
        })
      }
    )
  })
})

app.get('/adduser/:pileID/:userEmail/:sumToPay', (req, res) => {
  var con = mysql.createConnection({
    host: '68.66.226.92',
    user: 'rohanpat_tester_024895379284',
    password: 'ThisisaPassword',
    port: '3306',
    database: 'rohanpat_cashpile',
  })
  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    var data
    con.query(
      "SELECT * FROM `simple_piles` WHERE `pile_id` = '" +
        req.params.pileID +
        "';",
      function (err, result) {
        if (err) throw err
        var_dump(result[0])
        data = JSON.parse(result[0]['data'])
        data.members.push({
          email: req.params.userEmail,
          sumToPay: req.params.sumToPay,
          hasPaid: false,
        })
        con.query(
          "UPDATE `simple_piles` SET `data` = '" +
            JSON.stringify(data) +
            "' WHERE `simple_piles`.`pile_id` = '" +
            req.params.pileID +
            "';",
          function (err, result) {
            if (err) throw err
            var_dump(data)
            var_dump(result[0])
            res.send({
              detail: 'User added to pile ' + req.params.pileID,
            })
          }
        )
      }
    )
  })
})

app.get('/piledata/:pileID', (req, res) => {
  var con = mysql.createConnection({
    host: '68.66.226.92',
    user: 'rohanpat_tester_024895379284',
    password: 'ThisisaPassword',
    port: '3306',
    database: 'rohanpat_cashpile',
  })
  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    var data
    con.query(
      "SELECT * FROM `simple_piles` WHERE `pile_id` = '" +
        req.params.pileID +
        "';",
      function (err, result) {
        if (err) throw err
        var_dump(result[0])
        data = JSON.parse(result[0]['data'])
        res.send({
          pileID: req.params.pileID,
          adminEmail: result[0]['admin_email'],
          data: data,
        })
      }
    )
  })
})

app.get('/markpaid/:pileID/:userEmail', (req, res) => {
  var con = mysql.createConnection({
    host: '68.66.226.92',
    user: 'rohanpat_tester_024895379284',
    password: 'ThisisaPassword',
    port: '3306',
    database: 'rohanpat_cashpile',
  })
  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    var data
    con.query(
      "SELECT * FROM `simple_piles` WHERE `pile_id` = '" +
        req.params.pileID +
        "';",
      function (err, result) {
        if (err) throw err
        var_dump(result[0])
        data = JSON.parse(result[0]['data'])
        for (var i = 0; i < data.members.length; i++) {
          if (data.members[i].email == req.params.userEmail) {
            data.members[i].hasPaid = true
          }
        }
        con.query(
          "UPDATE `simple_piles` SET `data` = '" +
            JSON.stringify(data) +
            "' WHERE `simple_piles`.`pile_id` = '" +
            req.params.pileID +
            "';",
          function (err, result) {
            if (err) throw err
            var_dump(data)
            var_dump(result[0])
            res.send({
              detail: 'User marked as paid in pile ' + req.params.pileID,
            })
          }
        )
      }
    )
  })
})

app.get('/markunpaid/:pileID/:userEmail', (req, res) => {
  var con = mysql.createConnection({
    host: '68.66.226.92',
    user: 'rohanpat_tester_024895379284',
    password: 'ThisisaPassword',
    port: '3306',
    database: 'rohanpat_cashpile',
  })
  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    var data
    con.query(
      "SELECT * FROM `simple_piles` WHERE `pile_id` = '" +
        req.params.pileID +
        "';",
      function (err, result) {
        if (err) throw err
        var_dump(result[0])
        data = JSON.parse(result[0]['data'])
        for (var i = 0; i < data.members.length; i++) {
          if (data.members[i].email == req.params.userEmail) {
            data.members[i].hasPaid = false
          }
        }
        con.query(
          "UPDATE `simple_piles` SET `data` = '" +
            JSON.stringify(data) +
            "' WHERE `simple_piles`.`pile_id` = '" +
            req.params.pileID +
            "';",
          function (err, result) {
            if (err) throw err
            var_dump(data)
            var_dump(result[0])
            res.send({
              detail: 'User marked as unpaid in pile ' + req.params.pileID,
            })
          }
        )
      }
    )
  })
})

app.use(express.json({ limit: '1mb' })) // allow bigger file transfers
app.use(express.urlencoded({ limit: '1mb', extended: true })) // allow bigger file transfers

// https://stackoverflow.com/a/40026625/16237146
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.listen(port, () => {
  console.log(`Server has started on port ${port}.`)
})
