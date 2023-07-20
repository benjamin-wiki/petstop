import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import connection from '../../connection'
import { getRandomPets } from '../pets'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getRandomPets', () => {
  it('should return a random pet', async () => {
    const pet = await getRandomPets(2)
    expect(pet).toHaveLength(2)
  })
})

describe('addNewPet', () => {
  it.todo('should add a new pet to the database')
})
