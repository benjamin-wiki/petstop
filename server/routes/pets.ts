import { v2 as cloudinary } from 'cloudinary'
import express from 'express'

import * as petsDb from '../db/functions/pets'
import * as votesDb from '../db/functions/votes'
import { checkJwt } from '../utils/auth'

const router = express.Router()

router.post('/:id/votes', checkJwt, async (req, res) => {
  const id = Number(req.params.id)
  const userId = req.auth?.payload.sub

  if (!userId) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  if (!id) {
    console.error('Invalid Pet ID')
    return res.sendStatus(404).send('Invalid Pet ID')
  }

  try {
    await votesDb.addVote(id, userId)
    await votesDb.incrementVoteCounter(id)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      if (error.message.includes('FOREIGN KEY')) {
        return res.sendStatus(404)
      }
    }
    res.status(500).send('Something went wrong')
  }
})

router.get('/:id/votes', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const points = await votesDb.getVotesById(id)
    res.json(points)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.get('/leaderboard', async (req, res) => {
  try {
    const pets = await petsDb.rankPets()

    res.json({ pets })
  } catch (error) {
    console.error('Error retrieving leaderboard data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/random', async (req, res) => {
  const count = Number(req.query.count) || 1
  try {
    const pets = await petsDb.getRandomPets(count)
    res.json({ pets })
  } catch (err) {
    res.status(500).json({ err: 'Failed to get random pets' })
  }
})

router.post('/', checkJwt, async (req, res) => {
  if (!req.body) {
    res.status(400).send('Bad Request: Cannot find name.')
    return
  }
  const { name, bio, imageUrl, animal } = req.body.pet
  const ownerId = req.auth?.payload.sub as string

  try {
    const pet = await petsDb.addPet({
      ownerId,
      name,
      bio,
      imageUrl,
      animal,
    })
    res.status(200).json({ pet })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add pet')
  }
})

router.get('/signature', checkJwt, (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET as string

  const timestamp = Math.round(new Date().getTime() / 1000)

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    apiSecret
  )

  res.json({
    signature,
    timestamp,
    cloudName,
    apiKey,
  })
})

router.get('/:id', async (req, res) => {
  try {
    const petId = Number(req.params.id)
    if (isNaN(petId)) {
      res.status(400).send('NONO, ID must be a number')
      return
    }
    const pet = await petsDb.getPetById(petId)
    if (pet == undefined) {
      res.sendStatus(404)
      return
    }
    res.json(pet)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Could not get pet' })
  }
})

export default router
