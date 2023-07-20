import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import connection from '../../connection'
import { getPetById } from '../pets'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('getPetById', () => {
  it('should return the correct pet', async () => {
    const expectedOutput = {
      id: 1,
      ownerId: 'auth0|649015576ef896963ad50a97',
      name: 'Aileen',
      bio: "The canine comedian who lives by his motto: 'If you can't make them laugh, give them the puppy eyes.' Famous for his incessant tail wagging and unyielding belief that every delivery person is an undercover spy, Bark never fails to keep us entertained.",
      animal: 'dog',
      imageUrl:
        'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg',
      points: 0,
    }

    const pet = await getPetById(1)

    expect(pet).toEqual(expectedOutput)
  })
})
