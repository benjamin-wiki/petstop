import express from 'express'

import { getOwnerPets } from '../db/functions/pets'
const router = express.Router()

//get pets by owner id
router.get('/:ownerId/pets', async (req, res) => {
  try {
    const ownerId = req.params.ownerId
    const pets = await getOwnerPets(ownerId)
    res.json({ pets })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'there seems to be a problem finding this owners pets!',
    })
  }
})

export default router
