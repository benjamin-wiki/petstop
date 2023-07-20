import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import connection from '../../connection'
import * as db from '../pets'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.migrate.rollback()
  await connection.migrate.latest()
  await connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('rankPets', () => {
  it('should return a list of pets', async () => {
    const pets = await db.rankPets()
    const points = pets.map((pet) => pet.points)
    expect(points).toMatchInlineSnapshot(`
      [
        7,
        0,
        0,
        0,
        0,
        0,
        0,
      ]
    `)
    expect(pets).toHaveLength(7)
  })
})
