import db from '../connection'

interface Vote {
  points: number
}

export async function getVotesById(petId: number): Promise<Vote> {
  return db('pets').select('points').where({ id: petId }).first()
}

export async function addVote(petId: number, userId: string): Promise<void> {
  await db('votes').insert({ petId, userId })
}

export async function incrementVoteCounter(petId: number): Promise<void> {
  await db('pets').where('id', petId).increment('points', 1)
}
