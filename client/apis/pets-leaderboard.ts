import { Pet } from '@models/pets'
import request from 'superagent'

export async function rankPets() {
  const response = await request.get('/api/v1/pets/leaderboard')

  return response.body.pets as Pet[]
}
