import request from 'superagent'

import { Pet } from '../../models/pets'

export async function getRandomPets(count: number): Promise<Pet[]> {
  const response = await request.get('/api/v1/pets/random').query({ count })

  return response.body.pets
}
