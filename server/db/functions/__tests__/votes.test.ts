import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import connection from '../../connection'
import { addVote, getVotesById, incrementVoteCounter } from '../votes'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

describe('getVotesById', () => {
  it('should return the correct number of votes for that pet', async () => {
    const points = await getVotesById(2)

    expect(points).toMatchInlineSnapshot(`
      {
        "points": 7,
      }
    `)
  })
})

describe('addVote', () => {
  it('should add a vote to the specified pet', async () => {
    const petId = 1
    const userId = 'auth0|1234'
    await addVote(petId, userId)

    const votes = await connection('votes').where({ petId, userId }).first()
    expect(votes).toBeDefined()
  })
})

describe('incrementVoteCounter', () => {
  it('should increment the number of votes for a pet by one', async () => {
    const petId = 1

    await incrementVoteCounter(petId)

    const { points } = await connection('pets')
      .where({ id: petId })
      .select('points')
      .first()

    expect(points).toBe(1)
  })
})
