import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

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

const port = process.env.PORT || 3001
app.listen(port, () => {
  if (process.send) {
    process.send('online')
  }
  console.log('Server has started on port ' + port)
})
