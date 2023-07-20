import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import * as db from '../../db/functions/pets'
import server from '../../server'

vi.mock('../../db/functions/pets')

describe('GET /api/v1/pets/leaderboard', () => {
  it('should return a list of pets', async () => {
    // Arrange
    vi.mocked(db.rankPets).mockResolvedValue([
      { id: 1, name: 'Doug', animal: 'dog', points: 1 },
    ])
    // Act
    const response = await request(server).get('/api/v1/pets/leaderboard')

    // Asser
    expect(response.body).toMatchInlineSnapshot(`
      {
        "pets": [
          {
            "animal": "dog",
            "id": 1,
            "name": "Doug",
            "points": 1,
          },
        ],
      }
    `)
  })

  it('should return an error when the db fails', async () => {
    // Arrange
    vi.mocked(db.rankPets).mockRejectedValue(new Error('SQLITE ERROR: sadge'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    const response = await request(server).get('/api/v1/pets/leaderboard')

    // Assert
    expect(console.error).toHaveBeenCalledWith(
      'Error retrieving leaderboard data:',
      new Error('SQLITE ERROR: sadge')
    )
    expect(response.body.error).toBe('Internal server error')
  })
})
