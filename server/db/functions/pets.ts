import { NewPet, Pet, PetData } from '../../../models/pets'
import db from '../connection'

export async function getOwnerPets(
  ownerId: string
): Promise<Omit<Pet, 'createdAt' | 'updatedAt'>[]> {
  try {
    const allOwnersPets = await db('pets')
      .where('ownerId', ownerId)
      .select('id', 'ownerId', 'name', 'bio', 'animal', 'imageUrl', 'points')
    return allOwnersPets
  } catch (error) {
    if (!ownerId) {
      throw new Error('Owner not found')
    }
    console.log('error getting pets of owner data')
    throw error
  }
}

export async function getPetById(id: number): Promise<PetData | undefined> {
  return db('pets')
    .where('id', id)
    .select('id', 'ownerId', 'name', 'bio', 'imageUrl', 'animal', 'points')
    .first()
}

export async function rankPets() {
  const leaderboardData = await db('pets')
    .orderBy('points', 'desc')
    .select('id', 'name', 'animal', 'points', 'imageUrl')
  return leaderboardData
}

export async function getRandomPets(count = 1): Promise<Pet[]> {
  return await db<Pet>('pets').select().orderByRaw('random()').limit(count)
}

export async function addPet(newPet: NewPet): Promise<Pet> {
  const { ownerId, name, bio, imageUrl, animal } = newPet
  const [insertedPet] = await db('pets')
    .insert({
      ownerId,
      name,
      bio,
      imageUrl,
      animal,
      points: 0,
    })
    .returning(['id', 'ownerId', 'name', 'bio', 'animal', 'imageUrl', 'points'])

  return insertedPet
}
