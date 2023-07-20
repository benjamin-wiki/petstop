// @vitest-environment jsdom
import { waitForElementToBeRemoved } from '@testing-library/react'
import nock from 'nock'
import { describe, expect, it } from 'vitest'

import { renderRoute, screen } from '@/test/utils'

// The more your tests resemble the way your software is used, the more confidence they can give you.
describe('<Home>', () => {
  it('renders home page', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/pets/random?count=2')
      .reply(200, {
        pets: [
          {
            id: 1,
            ownerId: '98',
            name: 'Aileen',
            bio: 'mock bio 1',
            animal: 'dog',
            imageUrl:
              'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg',
            points: 0,
          },
          {
            id: 2,
            ownerId: '99',
            name: 'Giralda',
            bio: 'mock bio 2',
            animal: 'cat',
            imageUrl:
              'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
            points: 7,
          },
        ],
      })

    renderRoute('/')

    await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i))

    expect(scope.isDone()).toBe(true)
    expect(screen.getByAltText(/dog/i)).toBeInTheDocument()
    expect(screen.getByAltText(/cat/i)).toBeInTheDocument()
    expect(screen.getByText(/mock bio 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Giralda/i)).toBeInTheDocument()
    expect(screen.getByText(/Aileen/i)).toBeInTheDocument()
  })

  it('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/pets/random?count=2')
      .reply(500)

    renderRoute('/')

    await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i))

    expect(screen.getByText(/There was an error/i)).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
