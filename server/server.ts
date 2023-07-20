import 'dotenv/config'

import { resolve } from 'node:path'

import express from 'express'

import ownerRoutes from './routes/owners'
import petRoutes from './routes/pets'

const server = express()

server.use(express.json())

server.use('/api/v1/owner', ownerRoutes)
server.use('/api/v1/pets', petRoutes)
server.get('/api/*', (_req, res) => {
  res.sendStatus(404)
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(resolve(__dirname, '../dist')))
  server.get('*', (_req, res) => {
    res.sendFile(resolve(__dirname, '../dist/index.html'))
  })
}

export default server
