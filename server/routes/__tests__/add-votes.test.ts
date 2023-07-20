import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  addVote,
  getVotesById,
  incrementVoteCounter,
} from '../../db/functions/votes'
import server from '../../server'
import { checkJwt } from '../../utils/auth'

vi.mock('../../utils/auth')
vi.mock('../../db/functions/votes')

afterEach(() => {
  vi.clearAllMocks()
})

describe('POST /api/v1/pets/:id/votes', () => {
  describe('when authenticated', () => {
    beforeEach(() => {
      vi.mocked(checkJwt).mockImplementation((req, res, next) => {
        req.auth = {
          header: {},
          token: '',
          payload: {
            sub: 'auth0|1234',
          },
        }

        next()
      })
    })

    it('should allow authenticated users to vote', async () => {
      vi.mocked(incrementVoteCounter).mockImplementation(async () => {})
      vi.mocked(addVote).mockImplementation(async () => {})

      const response = await request(server).post('/api/v1/pets/1/votes')

      expect(response.status).toBe(201)
    })

    it('should not allow authenticated user to vote on invalid pet ID', async () => {
      vi.mocked(incrementVoteCounter).mockImplementation(async () => {
        throw new Error('FOREIGN KEY CONSTRAINT')
      })

      vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.mocked(addVote).mockImplementation(async () => {})

      const response = await request(server).post('/api/v1/pets/4000/votes')

      expect(response.status).toBe(404)
    })

    it('should return 500 for internal server error', async () => {
      vi.mocked(addVote).mockRejectedValue(new Error('Something went wrong'))

      const response = await request(server).post('/api/v1/pets/1/votes')
      vi.spyOn(console, 'error').mockImplementation(() => {})
      expect(response.status).toBe(500)
    })
  })
  describe('when not authenticated', () => {
    beforeEach(() => {
      vi.mocked(checkJwt).mockImplementation((req, res) => {
        return res.sendStatus(401)
      })
    })

    it('should not allow unauthenticated users to vote', async () => {
      vi.mocked(incrementVoteCounter).mockImplementation(async () => {})
      vi.mocked(addVote).mockImplementation(async () => {})

      const response = await request(server).post('/api/v1/pets/1/votes')

      expect(response.status).toBe(401)
    })
  })
})

describe('GET /api/v1/pets/:id/votes', () => {
  it('should return the number of votes for that pet', async () => {
    vi.mocked(getVotesById).mockResolvedValue({ points: 5 })

    const response = await request(server).get('/api/v1/pets/2/votes')

    expect(response.body).toMatchInlineSnapshot(`
      {
        "points": 5,
      }
    `)
  })
})
