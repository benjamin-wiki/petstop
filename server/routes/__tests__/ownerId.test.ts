import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import * as db from '../../db/functions/pets'
import server from '../../server'

vi.mock('../../db/functions/pets')

describe('GET /api/V1/owner/:ownerId/pets', () => {
  it('should return data associated with ownerId', async () => {
    vi.mocked(db.getOwnerPets).mockResolvedValue([
      {
        id: 48,
        ownerId: '84',
        name: 'Smithy',
        bio: 'I slept',
        animal: 'cat',
        imageUrl: 'www.cat.com',
        points: -5,
      },
    ])
    //act
    const response = await request(server).get('/api/v1/owner/84/pets')

    //assert
    expect(response.body).toMatchInlineSnapshot(`
      {
        "pets": [
          {
            "animal": "cat",
            "bio": "I slept",
            "id": 48,
            "imageUrl": "www.cat.com",
            "name": "Smithy",
            "ownerId": "84",
            "points": -5,
          },
        ],
      }
    `)
  })

  it('should return an error when db route fails', async () => {
    vi.mocked(db.getOwnerPets).mockRejectedValue(new Error('SQLITE ERROR: sad'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    //act
    const response = await request(server).get('/api/v1/owner/84/pets')

    // assert
    expect(console.error).toHaveBeenCalledWith(new Error('SQLITE ERROR: sad'))
    expect(response.body.error).toBe(
      'there seems to be a problem finding this owners pets!'
    )
  })
})
