// @vitest-environment jsdom
import { useAuth0 } from '@auth0/auth0-react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  queryAllByText,
  renderRoute,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@/test/utils'
vi.mock('@auth0/auth0-react')

const mockUseAuth0 = vi.mocked(useAuth0)

beforeEach(() => {
  mockUseAuth0.mockReturnValue({
    ...useAuth0(),
    isAuthenticated: false,
    logout: vi.fn(),
    loginWithRedirect: vi.fn(),
  })
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('<PetForm>', () => {
  it('renders add-pet page', () => {
    renderRoute('/add-pet')

    expect(screen.getByText(/ADD A FURRY FRIEND/i)).toBeInTheDocument()
  })
})

describe('type into an input field', () => {
  it.todo('should successfully add a pet', async () => {
    renderRoute('/add-pet')

    const scope2 = nock('http://localhost')
      .post('/api/v1/pets', {
        pet: [
          {
            ownerId: 25,
            name: 'Orange',
            bio: '4',
            imageUrl: 'hello.jpg',
            animal: 'cat',
          },
        ],
      })
      .reply(200, {
        pet: [
          {
            ownerId: 25,
            name: 'Orange',
            bio: '4',
            imageUrl: 'hello.jpg',
            animal: 'cat',
          },
        ],
      })

    const scope3 = nock('http://localhost')
      .get('/api/v1/pets')
      .reply(200, {
        pet: [
          {
            ownerId: 25,
            name: 'Orange',
            bio: '4',
            imageUrl: 'hello.jpg',
            animal: 'cat',
          },
        ],
      })

    const form = await screen.findByRole('form', { name: 'Add Pet Form' })

    const petNameInput = within(form).getByLabelText(/Name/)
    const petAnimalInput = within(form).getByLabelText(/Animal/)
    const petBioInput = within(form).getByLabelText(/Bio/)
    const petImageInput = within(form).getByLabelText(/Image/)
    const submitButton = within(form).getByRole('button', { name: 'Add Pet' })

    const user = userEvent.setup()

    await user.type(petNameInput, 'Orange')
    await user.type(petAnimalInput, 'cat')
    await user.type(petBioInput, '4')
    await user.type(petImageInput, 'hello.jpg')
    await user.click(submitButton)
    //await waitForElementToBeRemoved(() => screen.getByRole('form', { name: 'Add Pet Form' }))
    waitForElementToBeRemoved(queryAllByText(petNameInput, /Orange/i)).catch(
      (err) => console.log(err)
    )

    expect(scope2.isDone()).toBeTruthy()
    expect(scope3.isDone()).toBeTruthy()
  })
})
