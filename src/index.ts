import express from 'express'
import { createRouter } from './router'

const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (_, res) => {
  res.send('RueJai Chat Backend')
})

app.use(createRouter())

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
