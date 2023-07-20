import { describe, expect, it } from 'vitest'
import { beforeEach } from 'vitest'

import { NewPet } from '../../../../models/pets'
import connection from '../../connection'
import { addPet } from '../pets'

beforeEach(async () => {
  await connection.migrate.rollback()
  await connection.migrate.latest()
  await connection.seed.run()
})

describe('addNewPet', () => {
  it('should add a new pet to the database', async () => {
    const newPetInfo = {
      ownerId: '',
      name: 'Henry',
      bio: 'Hi',
      imageUrl: '',
      animal: 'cat',
      points: 1,
    }

    const newPet = await addPet(newPetInfo as NewPet)
    expect(newPet).toMatchInlineSnapshot(`
      {
        "animal": "cat",
        "bio": "Hi",
        "id": 8,
        "imageUrl": "",
        "name": "Henry",
        "ownerId": "",
        "points": 0,
      }
    `)
  })
})
