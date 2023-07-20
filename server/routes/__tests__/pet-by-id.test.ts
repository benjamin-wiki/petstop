import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import { getPetById } from '../../db/functions/pets'
import server from '../../server'

vi.mock('../../db/functions/pets')

describe('GET /api/v1/pets/:id', () => {
  it('success case (responds the pet as expected)', async () => {
    vi.mocked(getPetById).mockResolvedValue({
      id: 3,
      ownerId: 'userId',
      name: 'mocked name',
      bio: "The canine comedian who lives by his motto: 'If you can't make them laugh, give them the puppy eyes.' Famous for his incessant tail wagging and unyielding belief that every delivery person is an undercover spy, Bark never fails to keep us entertained.",
      animal: 'dog',
      imageUrl:
        'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg',
      points: 0,
    })

    const response = await request(server).get('/api/v1/pets/3')

    expect(response.body).toMatchInlineSnapshot(`
      {
        "animal": "dog",
        "bio": "The canine comedian who lives by his motto: 'If you can't make them laugh, give them the puppy eyes.' Famous for his incessant tail wagging and unyielding belief that every delivery person is an undercover spy, Bark never fails to keep us entertained.",
        "id": 3,
        "imageUrl": "https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg",
        "name": "mocked name",
        "ownerId": "userId",
        "points": 0,
      }
    `)
  })

  it('failure case (should respond with an error) ', async () => {
    vi.mocked(getPetById).mockRejectedValue(new Error('Mock Database Error'))
    vi.spyOn(console, 'log').mockImplementation(() => {})

    const response = await request(server).get('/api/v1/pets/3')

    expect(response.body.error).toBe('Could not get pet')
    expect(console.log).toHaveBeenCalledWith(new Error('Mock Database Error'))
  })

  it('failure case (should respond with an error if petId is not a number) ', async () => {
    const response = await request(server).get('/api/v1/pets/string')

    expect(response.text).toBe(`NONO, ID must be a number`)
  })

  it('failure case (should respond with an error if pet information is undefined) ', async () => {
    vi.mocked(getPetById).mockResolvedValue(undefined)

    const response = await request(server).get('/api/v1/pets/8')

    expect(response.status).toBe(404)
  })
})
