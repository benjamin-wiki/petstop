// @vitest-environment jsdom
import nock from 'nock'
import { describe, expect, it } from 'vitest'

import { renderRoute, screen, waitFor } from '@/test/utils'

describe('<Leaderboard>', () => {
  it('should render the leaderboard when things go right', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/pets/leaderboard')
      .reply(200, {
        pets: [
          {
            id: 1,
            name: 'Aileen',
            animal: 'dog',
            imageUrl:
              'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg',
            points: 5,
          },
          {
            id: 3,
            name: 'Letizia',
            animal: 'cat',
            points: 0,
            imageUrl: 'FAKEIMAGEURL',
          },
        ],
      })

    // render the component for the test (testing library)
    renderRoute('/leaderboard')

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText(/Points: 5/i)).toBeInTheDocument()
    expect(screen.getByText(/Letizia/i)).toBeInTheDocument()
    expect(screen.getByAltText(/Letizia the cat/i)).toHaveAttribute(
      'src',
      'FAKEIMAGEURL'
    )
    expect(scope.isDone()).toBe(true)
  })

  it('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/pets/leaderboard')
      .reply(500)

    // render the component for the test (testing library)
    renderRoute('/leaderboard')

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText(/E-rawr/i)).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
