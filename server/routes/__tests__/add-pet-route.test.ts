import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'
import { beforeEach } from 'vitest'

import { Pet } from '../../../models/pets'
import connection from '../../db/connection'
import { addPet } from '../../db/functions/pets'
import server from '../../server'
import { checkJwt } from '../../utils/auth'

vi.mock('../../db/functions/pets')
vi.mock('../../utils/auth')
beforeEach(async () => {
  await connection.migrate.rollback()
  await connection.migrate.latest()
  await connection.seed.run()
})

describe('POST /api/v1/pets/', () => {
  it('adds a pet', async () => {
    const newPetInfo: Pet = {
      id: 1,
      ownerId: '',
      name: 'Henry',
      bio: 'Hi',
      imageUrl: '',
      animal: 'cat',
      points: 1,
      createdAt: '2023-06-19 23:20:21',
      updatedAt: '2023-06-19 23:20:21',
    }
    vi.mocked(checkJwt).mockImplementation((req, res, next) => {
      const auth = req.auth
      if (auth != null) {
        auth.payload = { sub: 'auth0|fjsdkfdj' }
      }
      next()
    })
    vi.mocked(addPet).mockResolvedValue(newPetInfo as Pet)

    const response = await request(server)
      .post('/api/v1/pets/')
      .send({ pet: newPetInfo })

    expect(response.status).toBe(200)
    expect(response.body.pet).toMatchInlineSnapshot(`
      {
        "animal": "cat",
        "bio": "Hi",
        "createdAt": "2023-06-19 23:20:21",
        "id": 1,
        "imageUrl": "",
        "name": "Henry",
        "ownerId": "",
        "points": 1,
        "updatedAt": "2023-06-19 23:20:21",
      }
    `)
  })

  it('returns status 500 if an error occurs during pet addition', async () => {
    const newPetInfo: Pet = {
      id: 1,
      ownerId: '',
      name: 'Henry',
      bio: 'Hi',
      imageUrl: '',
      animal: 'cat',
      points: 1,
      createdAt: '2023-06-19 23:20:21',
      updatedAt: '2023-06-19 23:20:21',
    }
    vi.mocked(checkJwt).mockImplementation((req, res, next) => {
      const auth = req.auth
      if (auth != null) {
        auth.payload = { sub: 'auth0|fjsdkfdj' }
      }
      next()
    })
    vi.mocked(addPet).mockImplementation(() => {
      throw new Error('Database error')
    })
    vi.spyOn(console, 'log').mockImplementation(() => {})

    const response = await request(server)
      .post('/api/v1/pets/')
      .send({ pet: newPetInfo })

    expect(response.status).toBe(500)
    expect(response.text).toBe('Could not add pet')
  })
})

const mockEnv = vi.mocked(process.env)

vi.mock('cloudinary', () => {
  return {
    v2: {
      utils: {
        api_sign_request: () => 'mockedSignature',
      },
    },
  }
})

describe('GET /signature', () => {
  const expectedSignature = 'mockedSignature'
  const expectedCloudName = 'mockedCloudName'
  const expectedApiKey = 'mockedApiKey'

  beforeEach(() => {
    mockEnv.CLOUDINARY_CLOUD_NAME = expectedCloudName
    mockEnv.CLOUDINARY_API_KEY = expectedApiKey
    mockEnv.CLOUDINARY_API_SECRET = 'mockedApiSecret'
  })

  it('returns the signature and other details', async () => {
    const response = await request(server).get('/api/v1/pets/signature')

    expect(response.status).toBe(200)
    expect(response.body.signature).toEqual(expectedSignature)
    expect(response.body.cloudName).toEqual(expectedCloudName)
    expect(response.body.apiKey).toEqual(expectedApiKey)
  })
})
