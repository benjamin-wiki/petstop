import { useAuth0 } from '@auth0/auth0-react'
import { faCat, faDog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'

import { NewPet } from '../../models/pets'
import { addPet, uploadImage } from '../apis/add-pet-apiClient'

const initialFormData = {
  name: '',
  bio: '',
  imageUrl: '',
  animal: '',
}

export default function PetForm() {
  const [form, setForm] = useState<NewPet>(initialFormData as NewPet)
  const queryClient = useQueryClient()
  const { user, getAccessTokenSilently } = useAuth0()
  const [imageSelected, setImageSelected] = useState<File | null>(null)

  const addPetMutation = useMutation(addPet, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['pets', 'owner', user?.sub])
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  function handleClear() {
    setForm(initialFormData as NewPet)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (imageSelected) {
      const token = await getAccessTokenSilently()
      const imageUrl = await uploadImage(imageSelected, token)

      addPetMutation.mutate({ pet: { ...form, imageUrl }, token })
    } else {
      addPetMutation.mutate({ pet: form, token: '' })
    }

    setForm(initialFormData as NewPet)
  }

  if (addPetMutation.isError) {
    return <div>There was an error trying to add your pet</div>
  }

  if (addPetMutation.isLoading) {
    return <div>Adding your pet</div>
  }

  return (
    <div className="addPetBody">
      <div className="content">
        <div className="title">
          <div className="mb-10 mt-8">
            <h1 className="border-b-4 border-b-purple font-header text-4xl ">
              ADD A FURRY FRIEND
            </h1>
          </div>
        </div>

        <div className="formContainer">
          <form
            onSubmit={handleSubmit}
            aria-label="Add Pet Form"
            className="mr-10 mt-12"
          >
            <div className="flex">
              <div className="mr-10 inline-block font-header text-2xl text-shadow">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  id="name"
                  onChange={handleChange}
                  value={form.name}
                  name="name"
                  required
                  style={{
                    border: '1px solid lightgray',
                    borderRadius: '5px',
                    margin: '4px',
                    fontSize: 'large',
                    fontFamily: 'sans-serif',
                  }}
                />
              </div>
              <div className="mr-4 inline-block font-header text-2xl text-shadow">
                <label htmlFor="animal">Animal</label>
                <br />
                <select
                  id="animal"
                  onChange={handleSelectChange}
                  value={form.animal}
                  name="animal"
                  required
                  style={{
                    border: '1px solid lightgray',
                    borderRadius: '5px',
                    margin: '4px',
                    fontSize: 'large',
                    fontFamily: 'sans-serif',
                  }}
                  className="dropDown"
                >
                  <option value="">-- Select Type of Pet --</option>
                  <option value="cat" className="dropDown">
                    Cat
                  </option>
                  <option value="dog" className="dropDown">
                    Dog
                  </option>
                </select>
              </div>
            </div>
            <p className="mr-4 mt-10 inline-block font-header text-2xl text-shadow">
              <label htmlFor="bio">Bio</label>
              <br />
              <textarea
                id="bio"
                onChange={handleTextAreaChange}
                value={form.bio}
                name="bio"
                required
                rows={6}
                cols={51}
                placeholder={`Tell us a little bit about ${form.name}...`}
                style={{
                  border: '1px solid lightgray',
                  borderRadius: '5px',
                  margin: '4px',
                  fontSize: 'large',
                  fontFamily: 'sans-serif',
                }}
              />
            </p>
            <br />
            <label
              htmlFor="imageUrl"
              className="mr-4 mt-10 inline-block font-header text-2xl text-shadow"
            >
              Upload Image:
            </label>
            <br />
            <div className="file-upload-button">
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                onChange={(event) => {
                  const files = event.target.files
                  if (files && files.length > 0) {
                    setImageSelected(files[0])
                  }
                }}
              />
              <span className="input-button-label">
                <FontAwesomeIcon
                  icon={faDog}
                  className="fa-thin"
                  style={{ color: '#ca3dca', marginRight: '8px' }}
                />
                Choose File
                <FontAwesomeIcon
                  icon={faCat}
                  className="fa-thin, fa-flip-horizontal"
                  style={{ color: '#ca3dca', marginLeft: '8px' }}
                />
              </span>
            </div>

            <div className="buttonContainer">
              <button className="button">Add Pet</button>
              <button className="button" onClick={handleClear}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
