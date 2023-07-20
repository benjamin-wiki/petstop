import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import * as pets from '../../db/functions/pets'
import server from '../../server'

vi.mock('../../db/functions/pets')

describe('GET /api/v1/pets/random', () => {
  it('should return a random pet from the array of pets', async () => {
    vi.mocked(pets.getRandomPets).mockResolvedValue([
      {
        id: 1,
        ownerId: 'auth0|649015576ef896963ad50a97',
        name: 'Aileen',
        bio: 'The canine comedian who lives by his motto.',
        imageUrl: 'https://cdn.pixabay.com',
        animal: 'dog',
        points: 0,
        createdAt: '2023-06-19 23:20:21',
        updatedAt: '2023-06-19 23:20:21',
      },
    ])
    const response = await request(server).get('/api/v1/pets/random')

    expect(response.body).toMatchInlineSnapshot(`
      {
        "pets": [
          {
            "animal": "dog",
            "bio": "The canine comedian who lives by his motto.",
            "createdAt": "2023-06-19 23:20:21",
            "id": 1,
            "imageUrl": "https://cdn.pixabay.com",
            "name": "Aileen",
            "ownerId": "auth0|649015576ef896963ad50a97",
            "points": 0,
            "updatedAt": "2023-06-19 23:20:21",
          },
        ],
      }
    `)
    expect(pets.getRandomPets).toHaveBeenCalledWith(1)
  })
  it('should return a random pet from the array of pets', async () => {
    vi.mocked(pets.getRandomPets).mockResolvedValue([
      {
        id: 1,
        ownerId: 'auth0|649015576ef896963ad50a97',
        name: 'Aileen',
        bio: 'The canine comedian who lives by his motto.',
        imageUrl: 'https://cdn.pixabay.com',
        animal: 'dog',
        points: 0,
        createdAt: '2023-06-19 23:20:21',
        updatedAt: '2023-06-19 23:20:21',
      },
      {
        id: 2,
        ownerId: '56',
        name: 'Bob',
        bio: 'The Cat surfer who lives by his motto.',
        imageUrl: 'https://cdn.trademe.com',
        animal: 'cat',
        points: 100,
        createdAt: '2023-06-19 23:20:26',
        updatedAt: '2023-06-19 23:20:26',
      },
    ])
    const response = await request(server).get('/api/v1/pets/random?count=2')

    expect(response.body).toMatchInlineSnapshot(`
      {
        "pets": [
          {
            "animal": "dog",
            "bio": "The canine comedian who lives by his motto.",
            "createdAt": "2023-06-19 23:20:21",
            "id": 1,
            "imageUrl": "https://cdn.pixabay.com",
            "name": "Aileen",
            "ownerId": "auth0|649015576ef896963ad50a97",
            "points": 0,
            "updatedAt": "2023-06-19 23:20:21",
          },
          {
            "animal": "cat",
            "bio": "The Cat surfer who lives by his motto.",
            "createdAt": "2023-06-19 23:20:26",
            "id": 2,
            "imageUrl": "https://cdn.trademe.com",
            "name": "Bob",
            "ownerId": "56",
            "points": 100,
            "updatedAt": "2023-06-19 23:20:26",
          },
        ],
      }
    `)
    expect(pets.getRandomPets).toHaveBeenCalledWith(2)
  })

  it('should return an error when db fails', async () => {
    vi.mocked(pets.getRandomPets).mockRejectedValue(
      new Error('failed to get random pets')
    )

    const response = await request(server).get('/api/v1/pets/random')

    expect(response.body).toEqual({ err: 'Failed to get random pets' })
  })
})
