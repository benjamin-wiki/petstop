/** @jest-environment jsdom */
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import nock from 'nock'
import { describe, expect, it } from 'vitest'

import { renderRoute } from '@/test/utils'

describe('<Pet>', () => {
  it('should render a pet', async () => {
    const scope = nock('http://localhost').get('/api/v1/pets/1').reply(200, {
      id: 1,
      ownerId: 'auth0|649015576ef896963ad50a97',
      name: 'Aileen',
      bio: "The canine comedian who lives by his motto: 'If yo…ver spy, Bark never fails to keep us entertained.",
      imageUrl:
        'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg',
      animal: 'dog',
      points: 0,
    })

    renderRoute('/pets/1')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(screen.getByAltText('dog')).toHaveAttribute(
      'src',
      'https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_1280.jpg'
    )
    expect(scope.isDone()).toBeTruthy()
    expect(screen.queryByText(/aileen/i)).toBeInTheDocument()
    expect(screen.queryByText(/points/i)).toBeInTheDocument()
    expect(screen.queryByText(/dog/i)).toBeInTheDocument()
    expect(
      screen.queryByText(
        /The canine comedian who lives by his motto: 'If yo…ver spy, Bark never fails to keep us entertained./i
      )
    ).toBeInTheDocument()
  })

  it('should send an error when it fails', async () => {
    const scope = nock('http://localhost').get('/api/v1/pets/1').reply(500, {
      error: 'Could not get pet',
    })

    renderRoute('/pets/1')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(scope.isDone()).toBeTruthy()
    expect(screen.queryByText(/ERROR/i)).toBeInTheDocument()
  })
})
